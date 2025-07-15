// import React from "react";
// import { useParams } from "react-router-dom";
// import { useAppContext } from "../../contexts/AppContext";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { products, loading, error } = useAppContext();
//   const product = products.find(p=>p.id === parseInt(id))

//   if (loading) return <p>Loading product details...</p>;
//   if (error) return <p>{error}</p>;
//   if (!product) return <p>Product not found 🤷‍♂️</p>;

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
import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useAppContext();

  const product = products.find((p) => p.id === parseInt(id));

  if (loading)
    return <p className="text-center mt-10">Loading product details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center mt-10">Product not found 🤷‍♂️</p>;

  // Placeholder rating (since your API doesn't have it yet)
  const rating = product.rating?.rate || 4.5; // fallback to 4.5
  const totalReviews = product.rating?.count || 120; // fallback to 120 reviews

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Product Image */}
        <div className="md:w-1/2 flex justify-center border border-gray-300 rounded-[2%] bt-10 mt-10 shadow-lg w-100 h-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-[40%]"
          />
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-gray-600">Category: {product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">⭐ {rating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} reviews)
            </span>
          </div>

          <p className="text-xl font-semibold text-green-600">
            Price: ${product.price}
          </p>

          <p>
            Brand: <span className="capitalize">{product.brand || "N/A"}</span>
          </p>
          <p>
            Model: <span>{product.model || "N/A"}</span>
          </p>
          <p>
            Color: <span className="capitalize">{product.color || "N/A"}</span>
          </p>
          <p>Discount: {product.discount || 0}%</p>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => alert("✅ Product added successfully!")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => alert("⏳ Product is pending to buy...")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
