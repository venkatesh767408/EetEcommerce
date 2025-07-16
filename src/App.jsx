import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUsPage/AboutUs';
import Login from './pages/Login';
import './App.css';
import ProductsLoader from './components/Loaders/ProductsLoader';
import Product from './components/Product';
import Offer from './pages/Offerspage';
import ProductDetails from './compents/Products/ProductDetails';
import ProtectedRoute from './components/middleware/ProtectedRoute';
const Products = lazy(() => import('./components/Products'));

const AppWrapper = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/'; // Only hide on login page

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <Suspense fallback={<ProductsLoader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/products/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/offers" element={<ProtectedRoute><Offer /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        </Routes>
      </Suspense>

      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
