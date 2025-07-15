import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  // const { id } = useParams();
  const id = 1; // 🔥 Hardcoded ID
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching product with ID:", id); // ✅ log id

    axios
      .get(`https://fakestoreapi.com/products/${id}`) // ✅ use .com not .in
      .then((res) => {
        console.log("API Response:", res); // ✅ log full response
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err); // ✅ log error
        setLoading(false);
      });
  }, [id]); // ✅ dependency

  if (loading) return <p>Loading ProductDetails...</p>;
  if (!product) return <p>Product data not found 🤷‍♂️</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="300" />
      <h3>Price: ${product.price}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
    </div>
  );
};

export default ProductDetails;
