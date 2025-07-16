import React from 'react';
import './Categories.css';
import exploreImage from '../assests/suji.jpg';
import { Link } from 'react-router-dom'; // ✅ Import Link

const categories = [
  { icon: '🍒', name: 'Fruits', items: 291, bg: '#dcfce7' },
  { icon: '🧁', name: 'Bakery', items: 8, bg: '#fef9c3' },
  { icon: '💄', name: 'Makeup', items: 89, bg: '#f0abfc' },
  { icon: '📱', name: 'Phones', items: 55, bg: '#dbeafe' },
];

const Categories = () => {
  return (
    <section className="explore">
      <div className="explore-left">
        <div className="image-container">
          <img src={exploreImage} alt="Explore" />
          <div className="badge">50% Off</div>
        </div>
      </div>

      <div className="explore-right">
        <h2>Explore <br /> Categories</h2>
        <div className="category-list">
          {categories.map((cat, index) => (
            <Link to="/categories" key={index} style={{ textDecoration: 'none' }}>
              <div className="category-card" style={{ backgroundColor: cat.bg }}>
                <div className="icon">{cat.icon}</div>
                <p className="name">{cat.name}</p>
                <p className="count">{cat.items} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
