
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUsPage/AboutUs';

import Login from './pages/Login';
import './App.css';



import Login from './pages/Login';
import ProductsLoader from './components/Loaders/ProductsLoader';

import Product from './components/Product';
import Offer from './pages/Offerspage'

import ProductDetails from './compents/Products/ProductDetails';


const Products = lazy(() => import('./components/Products'));



const App = () => {
  return (
    <BrowserRouter>

 
      
      <Routes>
        <Route path="/" element={<Home />} />
      
      

      <Suspense fallback={
     <ProductsLoader/>
      }>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<Products />} />
           <Route path="/about" element={<AboutUs />} />

          <Route path="/products/product/:id" element={<Product />} />
          <Route path="/offers" element={<Offer />} />


          <Route path="/products/:id" element={<ProductDetails />} />

        </Routes>
      </Suspense>
   

    </BrowserRouter>
  );
};

export default App;

