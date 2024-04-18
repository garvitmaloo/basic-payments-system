import { createHmac } from "crypto";
import { config } from "dotenv";

config();

const verifyPayment = (
  razorpaySignature: string,
  orderCreationId: string,
  razorpayPaymentId: string,
  razorpayOrderId: string
): boolean => {
  const shasum = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature) {
    return false;
  }

  return true;
};

export default verifyPayment;
