/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import postNewOrderController from "../controllers/orders/postNewOrderController";

const ordersRoutes = Router();

ordersRoutes.post("/", postNewOrderController);

export { ordersRoutes };
