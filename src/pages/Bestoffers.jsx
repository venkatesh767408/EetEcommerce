import React from 'react';
import ProductCard from '../components/productCard';
import offersData from '../data/offersData';
import '../styles/BestOffers.css';

const BestOffers = () => {
  return (
    <section className="best-offers">
      <h2 className="heading">Best <span>Offer</span></h2>
      <p className="subheading">check latest offers for you.</p>

      <div className="offers-grid">
        {offersData.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestOffers;



