import { createHmac } from "crypto";
import { config } from "dotenv";
import mongoose from "mongoose";

import Payment from "../../models/Payment";
import { PAYMENT_STATUS } from "../../utils/constants";

config();

const verifyPayment = async (
  razorpaySignature: string,
  orderCreationId: string,
  razorpayPaymentId: string,
  razorpayOrderId: string
): Promise<boolean> => {
  const paymentDetails = new Payment({
    orderId: new mongoose.Schema.Types.ObjectId(orderCreationId),
    razorpayPaymentId,
    razorpayOrderId
  });

  const shasum = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

  const digest = shasum.digest("hex");

  if (digest === razorpaySignature) {
    paymentDetails.paymentStatus = PAYMENT_STATUS.VERIFIED;
    await paymentDetails.save();
    return true;
  }

  await paymentDetails.save();
  return false;
};

export default verifyPayment;
