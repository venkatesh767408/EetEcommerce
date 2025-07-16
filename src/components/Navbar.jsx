
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../assests/logo.jpg';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="nav-logo">
//         <img src={logo} alt="Hyd Foodies" />
//         <span>Hyd <strong>Fashions</strong></span>
//       </div>

//       {/* Hamburger Icon */}
//       <div className="hamburger" onClick={toggleMobileMenu}>
//         ☰
//       </div>

//       {/* Main Menu */}
//       <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/categories">Categories</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/products">Products</Link></li>
//         <li><Link to="/blog">Blog</Link></li>
//         <li><Link to="/offers">Offers</Link></li>
//       </ul>

//       {/* Search Box */}
//       <div className="nav-search">
//         <select>
//           <option>Cold Drinks</option>
//           <option>Snacks</option>
//         </select>
//         <input type="text" placeholder="Search products..." />
//         <button>🔍</button>
//       </div>

//       {/* Icons */}
//       <div className="nav-icons">
//         <Link to="/login">👤 Login</Link>
//         <Link to="/wishlist">⭐ Wishlist</Link>
//         <Link to="/cart">🛒 Cart</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assests/logo.jpg';
import profilePic from '../assests/suji.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="logo-text">Hyd <strong>Fashions</strong></span>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/offers">Offers</Link></li>
      </ul>

      {/* Search */}
      <div className="nav-search">
        <select>
          <option>Cold Drinks</option>
          <option>Snacks</option>
        </select>
        <input type="text" placeholder="Search..." />
        <button>🔍</button>
      </div>

      {/* Icons & Profile */}
      <div className="nav-right">
        <Link to="/wishlist">⭐</Link>
        <Link to="/cart">🛒</Link>

        <div className="profile-wrapper">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="profile-dropdown">
              <img src={profilePic} alt="User" className="profile-dropdown-img" />
              <p>Hi, Sujatha 👋</p>
              <Link to="/profile" className="profile-btn">View Profile</Link>
              <button className="logout-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
