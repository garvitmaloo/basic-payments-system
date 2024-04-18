import mongoose from "mongoose";
import type { UpdateQuery } from "mongoose";

import Order from "../../models/Order";
import type { IOrder, IStandardResponse } from "../../../types";
import { logger } from "../../utils/logger";

const updateOrderById = async (
  id: string,
  query: UpdateQuery<any>
): Promise<IStandardResponse<IOrder>> => {
  try {
    const mongoId = new mongoose.Types.ObjectId(id);
    const result = await Order.findOneAndUpdate(
      {
        _id: mongoId
      },
      query,
      {
        new: true
      }
    );

    return {
      error: null,
      result
    };
  } catch (err) {
    logger.error(
      `Failed to update Order Document with ID: ${id}, ` +
        (err as Error).message
    );
    return {
      error: {
        statusCode: 500,
        message: "Failed to update the document"
      },
      result: null
    };
  }
};

export default updateOrderById;
