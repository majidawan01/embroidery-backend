const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Admin = require("./models/Admin")

dotenv.config()

// Creates the admin account, or resets its password if it already exists.
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from the environment (.env).
async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD || ""

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
    process.exit(1)
  }

  if (password.length < 6) {
    console.error("ADMIN_PASSWORD must be at least 6 characters")
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      // Setting the password and calling save() runs the pre-save hook
      // in models/Admin.js, so the new password is hashed with bcrypt.
      existingAdmin.password = password
      await existingAdmin.save()
      console.log("Admin already existed. Password updated for " + email)
    } else {
      await Admin.create({
        name: "Majid Awan",
        email,
        password,
      })
      console.log("Admin created: " + email)
    }

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error("Admin seeding failed:", error.message)
    process.exit(1)
  }
}

seedAdmin()
