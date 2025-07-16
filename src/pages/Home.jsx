import React from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import Deals from '../components/Deals';
import TopVendors from '../components/TopVendors';

const Home = () => {
  return (
    <>
     <div className="home-container">
      <HeroSection />
      <Categories />
      <Deals />
      <TopVendors />
    </div>
    </>
   
  );
};

export default Home;
