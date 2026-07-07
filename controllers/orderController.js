const Order = require("../models/Order")
const Product = require("../models/Product")

// POST /api/orders — naya order banao (checkout se aayega)
async function createOrder(req, res) {
  try {
    const { customer, deliveryAddress, items, paymentMethod, totalAmount } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" })
    }

    // Stock check karo
    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(404).json({ message: "Product not found: " + item.name })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: "Not enough stock for " + product.name + ". Only " + product.stock + " left.",
        })
      }
    }

    // Order ID generate karo
    const orderId = "EMB-" + Date.now().toString().slice(-6)

    const order = await Order.create({
      orderId,
      customer,
      deliveryAddress,
      items,
      paymentMethod,
      totalAmount,
    })

    // Stock kam karo har product ka
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      })
    }

    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message })
  }
}

// GET /api/orders — sab orders lao (admin ke liye)
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message })
  }
}

// GET /api/orders/:orderId — ek order lao (order ID se)
async function getOrderByOrderId(req, res) {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message })
  }
}

// PUT /api/orders/:orderId/status — order status update karo (admin ke liye)
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true, runValidators: true }
    )
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: "Failed to update order status", error: error.message })
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  updateOrderStatus,
}