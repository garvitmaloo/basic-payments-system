export interface IStandardResponse<T> {
  error: {
    statusCode: number;
    message: string;
  } | null;
  result: T | null;
}

export interface IProduct {
  name: string;
  price: string;
  imageUrl?: string | null | undefined;
}
