import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = sessionStorage.getItem("token");
    const sessionUser = sessionStorage.getItem("user");
    // No login session
    if (!token || !sessionUser) {
        sessionStorage.clear();
        return <Navigate to="/SignIn" replace />;
    }
    const user = JSON.parse(sessionUser);
    // Role protection
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/Dashboard" replace />;
    }
    // User is authenticated
    return children;
};
export default ProtectedRoute;