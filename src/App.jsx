import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsLoader from './components/Loaders/ProductsLoader';
import AddProduct from './components/AddProduct';
import Offer from './pages/Offerspage';
import ProductDetails from './compents/Products/ProductDetails';

const Products = lazy(() => import('./components/Products'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="light"
          />
          <Suspense fallback={<ProductsLoader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/create" element={<AddProduct />} />
              <Route path="/offers" element={<Offer />} />
            </Routes>
          </Suspense>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;