const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

function generateToken(adminId) {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

// POST /api/auth/login
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await admin.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    res.json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message })
  }
}

// GET /api/auth/me — token se admin ki info
async function getMe(req, res) {
  res.json(req.admin)
}

module.exports = { loginAdmin, getMe }