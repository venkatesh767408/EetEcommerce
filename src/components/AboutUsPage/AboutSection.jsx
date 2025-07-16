import React from "react";
import aboutImage from "../../assets/about-img.webp";
import "./aboutus.css"; // Make sure this is imported

const AboutSection = () => {
  return (
    <section className="about-section">
      {/* Left image */}
      <div className="about-img">
        <img src={aboutImage} alt="About EagleEye" />
      </div>

      {/* Right content */}
      <div className="about-content">
        <h2>
          About  <span className="highlight">Eagle Eye Technologies</span>
        </h2>
        <h4>"Precision in Code. Vision in Innovation."
</h4>
        <p>
         Eagle Eye Technologies is a dynamic software solutions company focused on delivering intelligent, scalable, and user-centric digital products. We specialize in full-stack development, AI integration, and modern UI/UX design to help businesses transform ideas into powerful, real-world applications.
        </p>
        <p>
          Empowering businesses with smart, scalable, and future-ready software solutions.



        </p>

        {/* Stat boxes */}
        <div className="stats">
          <div className="stat-box">
            <h3>200+</h3>
            <p>Technology Partners</p>
          </div>
          <div className="stat-box">
            <h3>654k+</h3>
            <p> Project Sales</p>
          </div>
          <div className="stat-box">
            <h3>587k+</h3>
            <p>Client Delivers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
