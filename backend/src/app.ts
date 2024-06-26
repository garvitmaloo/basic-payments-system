import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";

import connectToDB from "./config/db";
import { logger } from "./utils/logger";
import { handleErrors } from "./middleware/handleErrors";
import { productRoutes } from "./routes/products";
import { ordersRoutes } from "./routes/orders";
import { paymentRoutes } from "./routes/payments";

const app = express();
config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
);

const port = process.env.PORT ?? 9000;

// APP ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payments", paymentRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrors(error, req, res, next);
});

connectToDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Connected to DB and server started on port ${port}`);
    });
  })
  .catch((err: Error) => {
    logger.error(err.message);
  });
