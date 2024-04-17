import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IProduct, IStandardResponse } from "../../types";
import PageHeading from "../../components/pageHeading";
import VerticalCard from "../../components/VerticalCard";

const HomeScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data }: { data: IStandardResponse<IProduct[]> } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`
      );

      if (data.result !== null) {
        setProducts(data.result);
      }
    };

    fetchAllProducts();
  }, []);

  const handleOnClick = (product: IProduct) => {
    navigate("/cart", {
      state: product,
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <PageHeading text="All Products" />
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <VerticalCard key={product._id}>
            <>
              <img
                src={product.imageUrl}
                alt="Product Image"
                height={400}
                width={600}
                style={{ height: "400px", width: "600px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button
                style={{ padding: "5px" }}
                onClick={() => handleOnClick(product)}
              >
                Buy Now
              </button>
            </>
          </VerticalCard>
        ))}
      </section>
    </div>
  );
};

export default HomeScreen;
