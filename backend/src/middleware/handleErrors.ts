import type { Request, Response, NextFunction } from "express";

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode ?? 500;

  res.status(statusCode).json({
    error: {
      statusCode,
      message: error.message
    },
    result: null
  });
  next();
};
