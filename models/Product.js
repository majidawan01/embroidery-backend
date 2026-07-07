const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Zari Work", "Thread Embroidery", "Mirror Work", "Cutwork & Lace"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    comparePrice: {
      type: Number,
      default: null,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isSale: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    fabric: String,
    stitchTime: String,
    color: String,
    care: String,
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
)

module.exports = mongoose.model("Product", productSchema)