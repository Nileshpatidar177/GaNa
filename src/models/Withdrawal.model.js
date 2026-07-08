import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    bankDetails: {
      accountHolderName: {
        type: String,
        required: true,
        trim: true,
      },

      bankName: {
        type: String,
        required: true,
        trim: true,
      },

      accountNumber: {
        type: String,
        required: true,
      },

      ifscCode: {
        type: String,
        required: true,
        uppercase: true,
      },

      upiId: {
        type: String,
        default: "",
      },
    },

    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "upi"],
      default: "bank_transfer",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "processing",
        "paid",
        "rejected",
      ],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    requestedAt: {
      type: Date,
      default: Date.now,
    },

    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

withdrawalSchema.index({ artist: 1, createdAt: -1 });
withdrawalSchema.index({ status: 1 });

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

export default Withdrawal;