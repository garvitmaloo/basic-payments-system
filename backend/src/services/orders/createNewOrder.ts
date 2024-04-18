import mongoose from "mongoose";

import type { IOrderDetails, IStandardResponse, IOrder } from "../../../types";
import razorpay from "../../config/razorpay";
import Order from "../../models/Order";
import { logger } from "../../utils/logger";

const createNewOrder = async (
  orderDetails: IOrderDetails
): Promise<IStandardResponse<IOrder>> => {
  try {
    const { amount, currency, products } = orderDetails;
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency
    });

    const productIds: mongoose.Types.ObjectId[] = [];
    products.forEach((prodId) => {
      productIds.push(new mongoose.Types.ObjectId(prodId));
    });

    const order = new Order({
      amount: amount * 100,
      products: productIds,
      razorpayOrderId: razorpayOrder.id
    });
    const savedOrder = await order.save();

    return {
      result: savedOrder,
      error: null
    };
  } catch (err) {
    logger.error("Failed to create an order " + (err as Error).message);
    return {
      result: null,
      error: {
        statusCode: 500,
        message: "Failed to create an order " + (err as Error).message
      }
    };
  }
};

export default createNewOrder;
