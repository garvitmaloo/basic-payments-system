export interface IStandardResponse<T> {
  error: {
    statusCode: number;
    message: string;
  };
  result: T | null;
}
