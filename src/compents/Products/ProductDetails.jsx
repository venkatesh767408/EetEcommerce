import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// axios
import axios from "axios";

const ProductDetails = () => {
  // useParams
  const { id } = useParams();
  // products
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  // useEffect()
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.in/api/products/${id}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>laoding Here ProductDetails....</p>;
  }
  if (!products) {
    return <p>Product data is not Found🤷‍♂️</p>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>{products.title}</h1>
      <img src={products.image} alt={products.title} width="300" />
      <h3>Price: ${products.price}</h3>
      <p>{products.description}</p>
      <p>
        <strong>Category:</strong> {products.category}
      </p>
    </div>
  );
};

export default ProductDetails;
