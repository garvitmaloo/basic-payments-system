import mongoose from "mongoose";

import { PAYMENT_STATUS } from "../utils/constants";

const ordersSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Product"
    },
    paymentStatus: {
      type: String,
      required: true,
      default: PAYMENT_STATUS.PENDING
    },
    razorpayOrderId: {
      type: String
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", ordersSchema);
export default Order;
