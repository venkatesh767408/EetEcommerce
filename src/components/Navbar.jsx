// import React from 'react';
// import './Navbar.css';
// import logo from '../assests/logo.jpg';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="nav-logo">
//         <img src={logo} alt="Hyd Foodies" />
//         <span>Hyd <strong>Foodies</strong></span>
//       </div>

//       <div className="nav-search">
//         <select>
//           <option>Cold Drinks</option>
//           <option>Snacks</option>
//         </select>
//         <input type="text" placeholder="Search products..." />
//         <button>🔍</button>
//       </div>

//       <div className="nav-icons">
//         <Link to="/login" className="nav-link">👤 Login</Link>
//         <Link to="/wishlist" className="nav-link">⭐ Wishlist</Link>
//         <Link to="/cart" className="nav-link">🛒 Cart</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assests/logo.jpg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="Hyd Foodies" />
        <span>Hyd <strong>Fashions</strong></span>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>

      {/* Main Menu */}
      <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/offers">Offers</Link></li>
      </ul>

      {/* Search Box */}
      <div className="nav-search">
        <select>
          <option>Cold Drinks</option>
          <option>Snacks</option>
        </select>
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
      </div>

      {/* Icons */}
      <div className="nav-icons">
        <Link to="/login">👤 Login</Link>
        <Link to="/wishlist">⭐ Wishlist</Link>
        <Link to="/cart">🛒 Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
