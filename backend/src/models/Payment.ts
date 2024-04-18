import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constants";

const paymentSchema = new mongoose.Schema(
  {
    razorpayPaymentId: {
      type: String,
      unique: true,
      required: true
    },
    razorpayOrderId: {
      type: String,
      unique: true,
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    paymentStatus: {
      type: String,
      default: PAYMENT_STATUS.SUCCESS
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
