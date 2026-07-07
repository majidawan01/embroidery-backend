const Review = require("../models/Review")
const Product = require("../models/Product")

// POST /api/reviews — customer review submit kare
async function createReview(req, res) {
  try {
    const { product, name, city, rating, comment } = req.body

    const productExists = await Product.findById(product)
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" })
    }

    const review = await Review.create({ product, name, city, rating, comment })
    res.status(201).json({
      message: "Thank you! Your review will appear after approval.",
      review,
    })
  } catch (error) {
    res.status(400).json({ message: "Failed to submit review", error: error.message })
  }
}

// GET /api/reviews/product/:productId — ek product ke approved reviews
async function getProductReviews(req, res) {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true,
    }).sort({ createdAt: -1 })

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

    res.json({
      reviews,
      count: reviews.length,
      avgRating: Math.round(avgRating * 10) / 10,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message })
  }
}

// GET /api/reviews — sab reviews (admin ke liye, pending bhi)
async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find()
      .populate("product", "name images")
      .sort({ createdAt: -1 })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message })
  }
}

// PUT /api/reviews/:id/approve — review approve/unapprove (admin)
async function toggleApproveReview(req, res) {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ message: "Review not found" })
    }
    review.isApproved = !review.isApproved
    await review.save()
    res.json(review)
  } catch (error) {
    res.status(400).json({ message: "Failed to update review", error: error.message })
  }
}

// DELETE /api/reviews/:id — review delete (admin)
async function deleteReview(req, res) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) {
      return res.status(404).json({ message: "Review not found" })
    }
    res.json({ message: "Review deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error: error.message })
  }
}

module.exports = {
  createReview,
  getProductReviews,
  getAllReviews,
  toggleApproveReview,
  deleteReview,
}