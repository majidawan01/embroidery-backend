const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  updateOrderStatus,
} = require("../controllers/orderController")

router.post("/", createOrder)
router.get("/", protect, getAllOrders)
router.get("/:orderId", getOrderByOrderId)
router.put("/:orderId/status", protect, updateOrderStatus)

module.exports = router