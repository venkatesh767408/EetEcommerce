// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import { useAppContext } from "../../contexts/AppContext";

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const { products, loading, error } = useAppContext();
// //   const product = products.find(p=>p.id === parseInt(id))

// //   if (loading) return <p>Loading product details...</p>;
// //   if (error) return <p>{error}</p>;
// //   if (!product) return <p>Product not found 🤷‍♂️</p>;

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>{product.title}</h1>
// //       <img src={product.image} alt={product.title} width="300" />
// //       <h3>Price: ${product.price}</h3>
// //       <p>{product.description}</p>
// //       <p>
// //         <strong>Category:</strong> {product.category}
// //       </p>
// //     </div>
// //   );
// // };

// // export default ProductDetails;
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useAppContext } from "../../contexts/AppContext";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { products, loading, error } = useAppContext();

//   const product = products.find((p) => p.id === parseInt(id));

//   if (loading)
//     return <p className="text-center mt-10">Loading product details...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!product)
//     return <p className="text-center mt-10">Product not found 🤷‍♂️</p>;

//   // Placeholder rating (since your API doesn't have it yet)
//   const rating = product.rating?.rate || 4.5; // fallback to 4.5
//   const totalReviews = product.rating?.count || 120; // fallback to 120 reviews

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10">
//       <div className="flex flex-col md:flex-row gap-10 items-start">
//         {/* Left: Product Image */}
//         <div className="md:w-1/2 flex justify-center border border-gray-300 rounded-[10%] bt-10 mt-2 w-100 h-130">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-contain rounded-[40%] "
//           />
//         </div>

//         {/* Right: Product Info */}
//         <div className="md:w-1/2 space-y-4">
//           <h1 className="text-2xl font-bold">{product.title}</h1>

//           <p className="text-gray-600">Category: {product.category}</p>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-500 text-lg">⭐ {rating}</span>
//             <span className="text-gray-500 text-sm">
//               ({totalReviews} reviews)
//             </span>
//           </div>

//           <p className="text-xl font-semibold text-green-600">
//             Price: ${product.price}
//           </p>

//           <p>
//             Brand: <span className="capitalize">{product.brand || "N/A"}</span>
//           </p>
//           <p>
//             Model: <span>{product.model || "N/A"}</span>
//           </p>
//           <p>
//             Color: <span className="capitalize">{product.color || "N/A"}</span>
//           </p>
//           <p>Discount: {product.discount || 0}%</p>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => alert("✅ Product added successfully!")}
//               className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => alert("⏳ Product is pending to buy...")}
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useAppContext();

  // Find current product
  const product = products.find((p) => p.id === parseInt(id));

  // Related products: same category, exclude current
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product.id
  );

  // Initialize Keen Slider
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1.2, spacing: 8 },
      },
    },
  });

  // Handlers
  const handleAddToCart = () => {
    toast.success("✅ Product added to cart!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleBuyNow = () => {
    toast.info("⏳ Product is pending to buy...", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleRelatedClick = (relatedId) => {
    navigate(`/products/${relatedId}`);
    window.scrollTo(0, 0);
  };

  // Loading / error / not found states
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading product details...
      </p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="text-center mt-10 text-gray-500">Product not found 🤷‍♂️</p>
    );

  // Placeholder rating
  const rating = product.rating?.rate || 4.5;
  const totalReviews = product.rating?.count || 120;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer />

      {/* Product details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2 flex justify-center items-center border rounded-xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">Category: {product.category}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">⭐ {rating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} reviews)
            </span>
          </div>

          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
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
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>

          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {relatedProducts.map((rp) => (
                <div
                  key={rp.id}
                  className="keen-slider__slide border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleRelatedClick(rp.id)}
                >
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-48 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-green-600 font-medium">${rp.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      toast.success(`✅ ${rp.title} added to cart!`, {
                        position: "top-right",
                        autoClose: 1500,
                        theme: "colored",
                      });
                    }}
                    className="mt-3 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-400 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {relatedProducts.length > 3 && (
              <>
                <button
                  onClick={() => slider.current?.prev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
                >
                  &#8592;
                </button>
                <button
                  onClick={() => slider.current?.next()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
                >
                  &#8594;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
