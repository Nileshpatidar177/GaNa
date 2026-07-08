import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSubscription",
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentType: {
      type: String,
      enum: ["subscription", "artist_payout", "refund"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["upi", "card", "net_banking", "wallet", "razorpay", "stripe"],
      default: "razorpay",
    },

    gateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "manual"],
      default: "razorpay",
    },

    orderId: {
      type: String,
      default: "",
    },

    paymentId: {
      type: String,
      default: "",
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },

    failureReason: {
      type: String,
      default: "",
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ artist: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;