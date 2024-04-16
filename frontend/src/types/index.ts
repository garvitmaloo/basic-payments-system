export type IStandardResponse<T> = {
  error: {
    statusCode: number;
    result: T;
  } | null;
  result: T | null;
};

export * from "./dto";
export * from "./props";
