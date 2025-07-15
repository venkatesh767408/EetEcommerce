// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ProductDetails = () => {
//   //   const { id } = useParams();
//   const id = 1;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Fetching product with ID:", id);
//     axios
//       .get(`https://fakestoreapi.com/products/${id}`)
//       .then((res) => {
//         console.log("Full Response:", res);
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("API Error:", err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Loading ProductDetails...</p>;
//   if (!product) return <p>Product data not found 🤷‍♂️</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>{product.title}</h1>
//       <img src={product.image} alt={product.title} width="300" />
//       <h3>Price: ${product.price}</h3>
//       <p>{product.description}</p>
//       <p>
//         <strong>Category:</strong> {product.category}
//       </p>
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const id = 1; // 🔥 Hardcoded random ID for testing
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 👈 Add error state

  useEffect(() => {
    console.log("Fetching product with ID:", id);

    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log("Full API Response:", res); // 👈 Log full response
        if (res.status === 200) {
          setProduct(res.data);
        } else {
          console.error("Non-200 response:", res.status);
          setError(`Error: ${res.status}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading ProductDetails...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
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
