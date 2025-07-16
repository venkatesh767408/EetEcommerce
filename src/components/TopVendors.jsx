import React, { useState } from 'react';
import './TopVendors.css';
import farmerImg from '../assests/farmer.jpg';

const vendors = [
  {
    id: 1,
    name: 'Mira Fashion Pvt. Ltd.',
    products: 'Fruits (5) | Vegetables (30) | Snacks (09)',
    sales: 587,
  },
  {
    id: 2,
    name: 'Eelna Fashion Pvt. Ltd.',
    products: 'Fruits (8) | Vegetables (15) | Snacks (04)',
    sales: 428,
  },
  {
    id: 3,
    name: 'Mario Fashion Pvt. Ltd.',
    products: 'Fruits (16) | Vegetables (42) | Snacks (18)',
    sales: 1024,
  },
  
];

const TopVendors = () => {
  const [activeVendorId, setActiveVendorId] = useState(1); // Default active vendor

  const handleClick = (id) => {
    setActiveVendorId(id);
  };

  return (
    <section className="top-vendors">
      <div className="top-vendors-left">
        <img src={farmerImg} alt="Vendor" />
      </div>
      <div className="top-vendors-right">
        <h2>
          Top <span className="highlight">Vendors</span>
        </h2>
        <p className="subtitle">
          Discover Our Trusted Partners: Excellence & Reliability in Every choice
        </p>

        <div className="vendor-list">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className={`vendor-card ${activeVendorId === vendor.id ? 'active' : ''}`}
              onClick={() => handleClick(vendor.id)}
            >
              <div className="vendor-info">
                <h4>{vendor.name}</h4>
                <p>{vendor.products}</p>
              </div>
              <span className="sales">Sales - {vendor.sales}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendors;
