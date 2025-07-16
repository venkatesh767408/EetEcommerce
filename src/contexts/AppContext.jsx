import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products");
        // Map _id to id for frontend consistency
        const mappedProducts = res.data.products.map((product) => ({
          ...product,
          id: product._id,
        }));
        setProducts(mappedProducts);
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
  const addToCart = async (product, userId) => {
    if (!userId) {
      throw new Error("Please log in to add items to cart");
    }
    try {
      // Update backend cart
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Update frontend cart state
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

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const value = { products, cart, addToCart, loading, error };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};