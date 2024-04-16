import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  imageUrl: String
});

const Product = mongoose.model("Product", productSchema);
export default Product;
