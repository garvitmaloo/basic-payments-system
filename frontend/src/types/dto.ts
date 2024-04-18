export type IProduct = {
  name: string;
  price: string;
  imageUrl: string;
  _id: string;
};

export type IRazorpayOrder = {
  order_id: string;
  amount: number;
  currency: string;
  id: string;
};
