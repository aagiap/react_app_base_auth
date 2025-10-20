import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/login' }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <div>Checking access...</div>
            </div>
        );
    }

    // If no user and route requires authentication
    if (!user && requiredRole) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If specific role is required
    if (requiredRole) {
        // Admin routes - only accessible by Admin
        if (requiredRole === 'Admin' && user?.roleName !== 'Admin') {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }

        // User routes (both User and Admin can access)
        if (requiredRole === 'User' && !user) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
