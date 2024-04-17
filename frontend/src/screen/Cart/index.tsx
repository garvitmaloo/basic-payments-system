import { useLocation } from "react-router-dom";

import { IProduct } from "../../types";
import PageHeading from "../../components/pageHeading";
import VerticalCard from "../../components/VerticalCard";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const productData: IProduct = location.state;

  const handleOnClick = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          orderDetails: {
            amount: +productData.price,
            currency: "INR",
            products: [productData._id],
          },
        }
      );
      console.log("DATA = ", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <PageHeading text="Cart" />
      <VerticalCard>
        <div style={{ maxWidth: "420px" }}>
          <img
            src={productData.imageUrl}
            alt="Product Image"
            height={400}
            width={600}
            style={{ height: "400px", width: "600px", objectFit: "cover" }}
          />
          <h3>{productData.name}</h3>
          <p>{productData.price}</p>
          <button style={{ padding: "5px" }} onClick={handleOnClick}>
            Checkout
          </button>
        </div>
      </VerticalCard>
    </div>
  );
};

export default Cart;
