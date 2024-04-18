import { createHmac } from "crypto";
import { config } from "dotenv";
import mongoose from "mongoose";

import Payment from "../../models/Payment";
import { PAYMENT_STATUS } from "../../utils/constants";
import updateOrderById from "../orders/updateOrderById";

config();

const verifyPayment = async (
  razorpaySignature: string,
  orderCreationId: string,
  razorpayPaymentId: string,
  razorpayOrderId: string,
  id: string
): Promise<boolean> => {
  const paymentDetails = new Payment({
    orderId: new mongoose.Types.ObjectId(id),
    razorpayPaymentId,
    razorpayOrderId
  });

  const shasum = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

  const digest = shasum.digest("hex");

  if (digest === razorpaySignature) {
    paymentDetails.paymentStatus = PAYMENT_STATUS.VERIFIED;
    await paymentDetails.save();
    await updateOrderById(id, {
      $set: { paymentStatus: PAYMENT_STATUS.VERIFIED }
    });
    return true;
  }

  await paymentDetails.save();
  await updateOrderById(id, {
    $set: { paymentStatus: PAYMENT_STATUS.SUCCESS }
  });
  return false;
};

export default verifyPayment;
