import React from "react";
import "./aboutus.css";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <h2>What Our Softwares Say</h2>
      <div className="testimonial-wrapper">
        {/* Tiny images around */}
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="tiny"
          className="tiny-img tiny1"
        />
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="tiny"
          className="tiny-img tiny2"
        />
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="tiny"
          className="tiny-img tiny3"
        />
        <img
          src="https://randomuser.me/api/portraits/men/33.jpg"
          alt="tiny"
          className="tiny-img tiny4"
        />

        {/* Main testimonial card */}
        <div className="testimonial-card">
          <img
            src="https://i.postimg.cc/RMX4v0BD/fc1cb495-a67e-4e16-8921-b8711b6cfb38.jpg"
            alt="Main Testimonial"
            className="main-img"
          />
          <p>
            We don't bug people, just our code!
Software: where 'just five minutes' means five hours of debugging!
          </p>
          <h4>Harika </h4>
          <span>EagleEye Employee</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
