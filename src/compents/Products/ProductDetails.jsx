import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error, addToCart } = useAppContext();
  const { user } = useAuth();

  // Find product by id (mapped from _id in AppContext)
  const product = products.find((p) => p.id === id);

  // Related products (same category, exclude current)
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  // Recommended products (random 5, exclude current)
  const recommendedProducts = products
    .filter((p) => p.id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  // Keen Slider for Related Products
  const [relatedSliderRef, relatedSlider] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 8 },
      },
    },
  });

  // Keen Slider for Recommended Products
  const [recommendedSliderRef, recommendedSlider] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 8 },
      },
    },
  });

  // Handlers
  const handleAddToCart = async (productToAdd) => {
    if (!user) {
      toast.error("Please log in to add items to cart", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      navigate("/login");
      return;
    }
    try {
      await addToCart(productToAdd, user._id);
      toast.success(`✅ ${productToAdd.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } catch (error) {
      toast.error(`Error adding to cart: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const handleBuyNow = () => {
    toast.info("⏳ Buy Now is not implemented yet!", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 0);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-800">
        Loading product details...
      </p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="text-center mt-10 text-gray-800">Product not found 🤷‍♂️</p>
    );

  // Placeholder rating
  const rating = product.rating?.rate || 4.5;
  const totalReviews = product.rating?.count || 120;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      {/* Product details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2 flex justify-center items-center border border-gray-300 rounded-xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">Category: {product.category}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">⭐ {rating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} reviews)
            </span>
          </div>

          <p className="text-2xl font-semibold text-gray-800">
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
              onClick={() => handleAddToCart(product)}
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
          <div className="relative">
            <div ref={relatedSliderRef} className="keen-slider">
              {relatedProducts.map((rp) => (
                <div
                  key={rp.id}
                  className="keen-slider__slide border border-gray-300 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleProductClick(rp.id)}
                >
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-48 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-gray-800 font-medium">${rp.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(rp);
                    }}
                    className="mt-3 px-4 py-1 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            {relatedProducts.length > 3 && (
              <>
                <button
                  onClick={() => relatedSlider.current?.prev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300 transition"
                >
                  ←
                </button>
                <button
                  onClick={() => relatedSlider.current?.next()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300 transition"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Recommended Products</h2>
          <div className="relative">
            <div ref={recommendedSliderRef} className="keen-slider">
              {recommendedProducts.map((rp) => (
                <div
                  key={rp.id}
                  className="keen-slider__slide border border-gray-300 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleProductClick(rp.id)}
                >
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-48 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-gray-800 font-medium">${rp.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(rp);
                    }}
                    className="mt-3 px-4 py-1 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            {recommendedProducts.length > 3 && (
              <>
                <button
                  onClick={() => recommendedSlider.current?.prev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300 transition"
                >
                  ←
                </button>
                <button
                  onClick={() => recommendedSlider.current?.next()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 rounded-full p-2 hover:bg-gray-300 transition"
                >
                  →
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