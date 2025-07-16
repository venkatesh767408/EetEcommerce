import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const isLoggedIn = JSON.parse(localStorage.getItem("login")) === true;

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
