import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUsPage/AboutUs';
import Login from './pages/Login';
import ProductsLoader from './components/Loaders/ProductsLoader';
import Product from './components/Product';
import Offer from './pages/Offerspage';
import ProductDetails from './compents/Products/ProductDetails';
import './App.css';

// Lazy-loaded component
const Products = lazy(() => import('./components/Products'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/products/product/:id" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Lazy-loaded Products route */}
        <Route
          path="/products"
          element={
            <Suspense fallback={<ProductsLoader />}>
              <Products />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
