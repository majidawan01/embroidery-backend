const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  createReview,
  getProductReviews,
  getAllReviews,
  toggleApproveReview,
  deleteReview,
} = require("../controllers/reviewController")

router.post("/", createReview)
router.get("/product/:productId", getProductReviews)
router.get("/", protect, getAllReviews)
router.put("/:id/approve", protect, toggleApproveReview)
router.delete("/:id", protect, deleteReview)

module.exports = router