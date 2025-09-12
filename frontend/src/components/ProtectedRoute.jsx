import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, isAuthLoading } = useAuth();

    // Show loading or return null while checking auth
    if (isAuthLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    // If not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the protected component
    return children;
}

export default ProtectedRoute;