/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import postVerifyPaymentController from "../controllers/payments/postVerifyPaymentController";

const paymentRoutes = Router();

paymentRoutes.post("/verify", postVerifyPaymentController);

export { paymentRoutes };
