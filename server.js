const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Embroidery Store API is running" })
})
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/orders", require("./routes/orderRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/reviews", require("./routes/reviewRoutes"))

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT)
  })
})