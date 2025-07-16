import React from "react";
import { useAppContext } from "../contexts/AppContext";
import "./RelatedItem.css";

const RelatedItemCard = ({ id, title, price, image }) => {
  const { addToCart, products } = useAppContext();

  const product = products.find((p) => p.id === id);

  return (
    <div className="related-card">
      <img src={image} alt={title} className="related-image" />
      <div className="related-details">
        <div className="related-category">Juice</div>
        <div className="related-title">{title}</div>
        <div className="related-price">${price.toFixed(2)} <span>3 Left</span></div>
        <div className="related-volume">100 ml</div>

        {/* ✅ Add to Cart button */}
        {product && (
          <button
            className="add-related-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default RelatedItemCard;