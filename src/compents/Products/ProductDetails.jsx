import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useAppContext();
  const product = products.find(p=>p.id === parseInt(id))

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found 🤷‍♂️</p>;

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
