import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { userData, loading } = useAuth();
  
  if (loading) return null;
  
  return userData?.role === 'admin' ? children : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
