import type { NextFunction, Request, Response } from "express";
import { getAllProductsService } from "../../services/products";

const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const response = await getAllProductsService();

  if (response.error !== null) {
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
  }

  res.status(200).json(response);
};

export default getAllProductsController;
