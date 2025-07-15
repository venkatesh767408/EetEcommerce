import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import "../components/Offeres.css";


const OffersPage = () => {
  const { products } = useAppContext();
  const [offerProducts, setOfferProducts] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    // 🛑 Wait until products are loaded
    if (products.length === 0) return;

    const discounted = products.filter(
      (product) => product.discount && product.discount > 0
    );

    const shuffled = [...discounted].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    setOfferProducts(selected);
  }, [products]);

  return (
    <div className="offers-container">
      <h1 className="offers-heading">🔥 Limited-Time Offers</h1>
      {products.length === 0 ? (
        <p>Loading offers...</p> // Optional loader
      ) : (
        <div className="offers-grid">
          {offerProducts.length === 0 ? (
            <p>No discounted products available.</p>
          ) : (
            offerProducts.map((product) => {
              const discountedPrice = (
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2);

              return (
                <div
                  key={product.id}
                  className="offer-card"
                  onClick={() => navigate(`/products/product/${product.id}`)}
                >
                  <span className="offer-badge">-{product.discount}%</span>
                  <img
                    src={product.image} 
                    alt="Coming soon present out of stock"
                    className="offer-image"
                  />
                  <h2 className="offer-title">{product.title}</h2>
                  <div className="offer-price">
                    <span className="offer-discount">${discountedPrice}</span>
                    <span className="offer-original">${product.price}</span>
                  </div>
                  <div className="offer-limited">Limited Time Deal!</div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default OffersPage;
