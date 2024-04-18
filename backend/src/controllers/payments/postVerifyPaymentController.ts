import type { Request, Response, NextFunction } from "express";

import verifyPayment from "../../services/payments/verifyPayment";
import type { IPaymentDetails } from "../../../types/index";

const postVerifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    id
  }: IPaymentDetails = req.body;
  const isPaymentVerificationSuccessful = await verifyPayment(
    razorpaySignature,
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    id
  );

  if (!isPaymentVerificationSuccessful) {
    res.statusCode = 400;
    next(new Error("Payment could not be verified"));
    return;
  }

  res.status(200).json({
    error: null,
    result: "Payment verified"
  });
};

export default postVerifyPaymentController;
