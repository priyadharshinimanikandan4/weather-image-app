import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser'));
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
