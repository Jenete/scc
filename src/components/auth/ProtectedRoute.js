import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  setTimeout(()=>{
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
  },2000);

  return children;
};

export default ProtectedRoute;
