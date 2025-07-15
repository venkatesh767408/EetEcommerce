// import React from 'react';
// import './Home.css';
// import Navbar from '../components/Navbar';
// import HeroSection from '../components/HeroSection';
// import Categories from '../components/Categories';
// import Deals from '../components/Deals';
// import TopVendors from '../components/TopVendors';
// import Footer from '../components/Footer';
// // import Categories from './components/Categories';

// const Home = () => {
//   return (
//     <div className="home-container">
//       <Navbar />
//       <HeroSection />
//        <Categories/>
//        <Deals/>
//        <TopVendors/>
//        <Footer/>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import Deals from '../components/Deals';
import TopVendors from '../components/TopVendors';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <Categories />
      <Deals />
      <TopVendors />
    </div>
  );
};

export default Home;
