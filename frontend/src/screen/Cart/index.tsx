import { useLocation } from "react-router-dom";
import axios from "axios";

import loadRazorpayScript from "../../utils/razorpay/loadScript";
import { IProduct, IRazorpayOrder } from "../../types";
import PageHeading from "../../components/pageHeading";
import VerticalCard from "../../components/VerticalCard";

const Cart = () => {
  const location = useLocation();
  const productData: IProduct = location.state;

  const handleOnClick = async () => {
    try {
      const hasScriptLoaded = await loadRazorpayScript();

      if (!hasScriptLoaded) {
        throw new Error(
          "Something went wrong; Failed to load razorpay on client."
        );
      }

      const {
        data: { amount, order_id, currency },
      }: { data: IRazorpayOrder } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orders`,
        {
          orderDetails: {
            amount: +productData.price,
            currency: "INR",
            products: [productData._id],
          },
        }
      );

      const rzaorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id,
        amount,
        currency,
        name: "My Own Shop",
        prefill: {
          name: "Garvit Test",
          email: "garvit@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#61dafb",
        },
        handler: async (response: any) => {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/payments/verify`,
            data
          );
          console.log("RES = ", res.data);
        },
      };

      const paymentWindow = new window.Razorpay(rzaorpayOptions);
      paymentWindow.open();
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
