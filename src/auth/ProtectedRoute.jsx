import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
