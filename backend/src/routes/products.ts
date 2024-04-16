/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from "express";

import getAllProductsController from "../controllers/products/getAllProductsController";

const productRoutes = Router();

productRoutes.get("/", getAllProductsController);

export { productRoutes };
