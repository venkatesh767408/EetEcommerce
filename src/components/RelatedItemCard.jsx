import React from "react";
import "./RelatedItemCard.css";

const RelatedItemCard = ({ title, price, image }) => {
  return (
    <div className="related-card">
      <img src={image} alt={title} className="related-image" />
      <div className="related-details">
        <div className="related-category">Juice</div>
        <div className="related-title">{title}</div>
        <div className="related-price">$15 <span>3 Left</span></div>
        <div className="related-volume">100 ml</div>
      </div>
    </div>
  );
};

export default RelatedItemCard;

