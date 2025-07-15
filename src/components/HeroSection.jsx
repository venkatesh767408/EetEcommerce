// import React from 'react';
// import './HeroSection.css';
// import heroImage from '../assests/foods.jpg';

// const HeroSection = () => {
//   return (
//     <section className="hero">
//       <div className="hero-text">
//         <p className="discount">Flat 20% Off</p>
//         <h1>
//           Explore <span className="highlight">Warm</span><br />
//           Fast Food & Snacks
//         </h1>
//         <button className="shop-btn">Shop Now</button>
//       </div>
//       <img src={heroImage} alt="Food Banner" className="hero-img" />
//     </section>
//   );
// };

// export default HeroSection;
import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import food1 from '../assests/friuts.jpg';
import food2 from '../assests/img1.jpg';
import food3 from '../assests/img2.jpg';
// import food4 from '../assests/phn.jpg';
import food5 from '../assests/makeup.jpg';
import food6 from '../assests/fashion.jpg';
const images = [food1,  food3, food2, food5,
    food6];

const phrases = [
  'Organic & Vegetables',
    'Trendy Fashion Styles',  
  'Healthy Fresh Fruits',
    'Beauty & Makeup Essentials',
  'Warm Fast Food & Snacks',     
 
  'Modern Lifestyle Picks'     

];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => {
      clearInterval(imageTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="discount">Flat 20% Off</p>
        <h1 className="hero-heading">
          Explore <span className="animated-text">{phrases[textIndex]}</span>
        </h1>
        <button className="shop-btn">Shop Now</button>
      </div>

      <div className="hero-slideshow">
        <img
          src={images[currentImage]}
          alt="Food Slideshow"
          className="hero-img fade-in"
        />
      </div>
    </section>
  );
};

export default HeroSection;
