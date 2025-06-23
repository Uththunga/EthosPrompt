import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireLifetimeAccess?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireLifetimeAccess = false 
}) => {
  const { user, userProfile, loading, hasLifetimeAccess } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If lifetime access is required but user doesn't have it
  if (requireLifetimeAccess && !hasLifetimeAccess) {
    return <Navigate to="/upgrade" state={{ from: location }} replace />;
  }

  // User is authenticated and has required access
  return <>{children}</>;
};

export default ProtectedRoute;
