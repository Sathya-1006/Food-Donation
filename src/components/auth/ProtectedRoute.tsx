import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'restaurant' | 'volunteer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  if (userType && currentUserType !== userType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;