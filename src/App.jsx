import React from "react";
import CartItem from "./components/CartItem";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CartSidebar from "./components/CartSidebar";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/cart" element={<CartSidebar/>} />
    </Routes>
    </BrowserRouter>
     
      
    
  );
};

export default App;
