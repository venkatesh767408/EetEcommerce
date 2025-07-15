import React from "react";
import "./aboutus.css";

const BrandsDirectory = () => {
  return (
    <section className="brands-directory">
      <h2 className="section-title">Brands Directory</h2>
      <div className="brands">
        <div className="left-brands">
          <p>🌿 Perfect for a collection of clean, modern components or utilities.</p>
          <p>🚜 Good for your main software features, services, or business logic.</p>
        </div>
        <div className="right-brands">
          <p>🛒 Can be used for tools, modules, or internal utilities.</p>
          <p>🥦 Great for frontend/backend integrations or full-stack project layers.</p>
        </div>
      </div>
    </section>
  );
};

export default BrandsDirectory;
