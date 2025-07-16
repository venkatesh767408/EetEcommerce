
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from fake store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://fakestoreapi.in/api/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart handler
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const value = { products, cart, addToCart, loading, error };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
