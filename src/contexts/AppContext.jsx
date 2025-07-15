// src/context/AppContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from fake store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.in/api/products");
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart handler
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        // If already in cart, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const value={ products,cart,addToCart}

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
