import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import playStore from '../assests/ss.png';
import appStore from '../assests/uu.png';
import blueberryLogo from '../assests/logo.jpg'; // logo like your screenshot

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Brands Directory */}
      <div className="brands-directory">
        <div>
          <strong>Jewellery :</strong> Necklace | Earrings | Couple Rings | Pendants | Crystal | Bangles | Bracelets | Nose Pin | Chain
        </div>
        <div>
          <strong>Footwear :</strong> Sport | Formal | Boots | Casual | Cowboy Shoes | Safety Shoes | Party Wear Shoes | Branded | First Copy | Long Shoes
        </div>
        <div>
          <strong>Fashion :</strong> T-Shirt | Short & Jeans | Jacket | Dress & Frock | Inner Wear | Hosiery
        </div>
        <div>
          <strong>Cosmetics :</strong> Shampoo | Body Wash | Face Wash | Makeup Kit | Liner | Lipstick | Perfume | Scrub | Hair Gel | Hair Colors | Hair Dye | Sunscreen | Skin Lotion
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-left">
          <img src={blueberryLogo} alt="Blueberry Logo" />
          <p>Hyd Fashion is the biggest market of grocery products. Get your daily needs from our store.</p>
          <div className="app-buttons">
            <img src={playStore} alt="Google Play" />
            <img src={appStore} alt="App Store" />
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Category</h4>
            <p>Snacks</p>
            <p>Juice</p>
            <p>Chips</p>
            <p>Spices</p>
            <p>Sauces</p>
            <p>Fruit</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <p>About us</p>
            <p>Delivery</p>
            <p>Legal Notice</p>
            <p>Terms & conditions</p>
            <p>Secure payment</p>
            <p>Contact us</p>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <p>Sign In</p>
            <p>View Cart</p>
            <p>Return Policy</p>
            <p>Become a Vendor</p>
            <p>Affiliate Program</p>
            <p>Payments</p>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p><FaMapMarkerAlt /> 971 Lajamni, Motavarachha, Surat, Gujarat, Bharat 394101.</p>
            <p><FaWhatsapp /> +00 9876543210</p>
            <p><FaEnvelope /> example@email.com</p>
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
