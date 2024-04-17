import { useLocation } from "react-router-dom";

import { IProduct } from "../../types";
import PageHeading from "../../components/pageHeading";
import VerticalCard from "../../components/VerticalCard";

const Cart = () => {
  const location = useLocation();
  const productData: IProduct = location.state;

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
          <button style={{ padding: "5px" }}>Checkout</button>
        </div>
      </VerticalCard>
    </div>
  );
};

export default Cart;
