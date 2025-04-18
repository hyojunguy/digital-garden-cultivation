import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Verify this path

// Assuming the structure <ProtectedRoute><Layout /></ProtectedRoute> from App.tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  console.log('ProtectedRoute Rendered. User from context:', user); // Add this log

  if (!user) {
    // User not logged in, redirect to login page
    console.log('ProtectedRoute: No user found, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the children components (e.g., Layout)
  console.log('ProtectedRoute: User found, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;