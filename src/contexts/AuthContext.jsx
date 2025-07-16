import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const userData = { _id: response.data.userId, email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      throw new Error(errorMessage);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      const userData = { _id: response.data.userId, email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Signed up successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const value = { user, login, signup, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};