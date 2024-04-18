import type { Document } from "mongoose";
import type mongoose from "mongoose";

export interface IStandardResponse<T> {
  error: {
    statusCode: number;
    message: string;
  } | null;
  result: T | null;
}

export interface IProduct {
  name: string;
  price: string;
  imageUrl?: string | null | undefined;
}

export interface IOrderDetails {
  amount: number;
  currency: string;
  products: string[];
}

export interface IOrder extends Document {
  amount: number;
  currency: string;
  products: mongoose.Types.ObjectId[];
  paymentStatus: string;
  razorpayOrderId?: string | null | undefined;
}

export interface IPaymentDetails {
  orderCreationId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}
