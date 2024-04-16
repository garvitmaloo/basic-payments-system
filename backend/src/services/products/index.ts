import type { IProduct, IStandardResponse } from "../../../types";
import Product from "../../models/Product";

export const getAllProductsService = async (): Promise<
  IStandardResponse<IProduct[]>
> => {
  try {
    const allProducts = await Product.find();
    return {
      error: null,
      result: allProducts
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: "Something went wrong while fetching all products from DB"
      },
      result: null
    };
  }
};
