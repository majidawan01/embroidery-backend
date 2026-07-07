const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      fullName: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
      email: {
        type: String,
        default: "",
      },
    },
    deliveryAddress: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      province: {
        type: String,
        required: [true, "Province is required"],
      },
      postalCode: {
        type: String,
        default: "",
      },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "jazzcash", "easypaisa"],
      default: "cod",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Order", orderSchema)