// <<<<<<< HEAD
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProductsLoader from './components/Loaders/ProductsLoader';
import ProductDetails from './compents/Products/ProductDetails';

// Lazy load the Products component
const Products = lazy(() => import('./components/Products'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={
     <ProductsLoader/>
      }>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
// =======
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProductDetails from "./compents/Products/ProductDetails";
// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />}></Route>
//           <Route path="/products/:id" element={<ProductDetails />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;
// >>>>>>> c5d5cf5a7707d8417dd8352582df7ffafc0516f5
