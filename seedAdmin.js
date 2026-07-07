const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Admin = require("./models/Admin")

dotenv.config()

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    const existingAdmin = await Admin.findOne({ email: "admin@embroiderystore.com" })
    if (existingAdmin) {
      console.log("Admin already exists")
      process.exit(0)
    }

    await Admin.create({
      name: "Majid Awan",
      email: "admin@embroiderystore.com",
      password: "admin123456",
    })

    console.log("Admin created successfully")
    console.log("Email: admin@embroiderystore.com")
    console.log("Password: admin123456")

    process.exit(0)
  } catch (error) {
    console.error("Admin seeding failed:", error.message)
    process.exit(1)
  }
}

seedAdmin()