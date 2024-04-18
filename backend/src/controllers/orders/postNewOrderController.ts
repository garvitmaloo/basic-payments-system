import type { NextFunction, Request, Response } from "express";

import createNewOrder from "../../services/orders/createNewOrder";
import type { IOrderDetails } from "../../../types/index";

const postNewOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const orderDetails: IOrderDetails = req.body.orderDetails;

  const response = await createNewOrder(orderDetails);

  if (response.result === null && response.error !== null) {
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
    return;
  }

  const orderResponse = {
    amount: response.result!.amount,
    order_id: response.result!.razorpayOrderId,
    currency: response.result!.currency
  };

  res.status(201).json(orderResponse);
};

export default postNewOrderController;
