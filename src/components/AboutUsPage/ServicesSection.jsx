import React from "react";
import "./aboutus.css";
import { FaLeaf, FaTruck, FaShoppingBasket, FaRegSmile } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <div className="service-cards">
        <div className="service-card">
          <FaLeaf className="service-icon" />
          <h3>Custom Software Development</h3>
          <p>Tailored software solutions built to match your business needs..</p>
        </div>
        <div className="service-card">
          <FaTruck className="service-icon" />
          <h3>Web & Mobile Applications</h3>
          <p>Responsive apps for seamless digital experiences across all devices.</p>
        </div>
        <div className="service-card">
          <FaShoppingBasket className="service-icon" />
          <h3>UI/UX Design</h3>
          <p>Clean, intuitive interfaces that enhance user interaction..</p>
        </div>
        <div className="service-card">
          <FaRegSmile className="service-icon" />
          <h3>AI-Powered Features</h3>
          <p>Smart solutions driven by machine learning and automation.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
