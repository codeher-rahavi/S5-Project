import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = sessionStorage.getItem("token");
    const sessionUser = sessionStorage.getItem("user");

    // 1. If no token or user metadata is found, boot them out to Login
    if (!token || !sessionUser) {
        sessionStorage.clear();
        return <Navigate to="/SignIn" replace />;
    }

    const user = JSON.parse(sessionUser);

    // 2. If role boundaries are specified, ensure the user has clearance
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If they are an Operator trying to access Admin pages, send them back to Overview
        return <Navigate to="/Overview" replace />;
    }

    // 3. If authenticated and cleared, render the target page (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;