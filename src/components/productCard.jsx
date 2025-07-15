import React, { useEffect, useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const totalSeconds = product.countdown * 24 * 60 * 60;
    return totalSeconds;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hrs = Math.floor((seconds % (24 * 3600)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days} Days : ${hrs.toString().padStart(2, '0')} : ${mins
      .toString()
      .padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="product-card">
      {product.tag && <span className="tag">{product.tag}</span>}
      <img src={product.image} alt={product.title} className="product-img" />

      <div className="info">
        <div className="top-line">
  <span className="category">{product.category}    </span>
  <span className="rating-stars">
    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
  </span>
</div>
        <h4 className="title">{product.title}</h4>
        <div className="price-line">
          <span className="price">₹{product.price != null ? product.price.toFixed(2) : 'N/A'}</span>
          {product.originalPrice != null && (
            <del>₹{product.originalPrice.toFixed(2)}</del>
          )}
          <span className=" weight">{product.weight || product.quantity || 'N/A'}</span>
        </div>
        <div className="bottom-info">
          <p className={product.stock === 'Out Of Stock' ? 'out' : ''}>
            {product.stock || 'Available'}
          </p>
          <p>⏳ {formatTime(timeLeft)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
