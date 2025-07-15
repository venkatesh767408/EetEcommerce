import React from "react";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import TestimonialSection from "./TestimonialSection";
import TeamSection from "./TeamSection";
import BrandsDirectory from "./BrandsDirectory";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <BrandsDirectory />
    </div>
  );
};

export default AboutUs;
