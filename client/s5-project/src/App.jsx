import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes/protectedRoutes";
import SignIn from "./pages/SignIn/signIn";
import SignUp from "./pages/SignUp/SignUp";
import Overview from "./pages/Overview/OverView";


function App() {
    return (
        <Router>
            <Routes>
                {/*Public Routes */}
                <Route path="/SignIn" element={<SignIn/>} />
                <Route path="/SignUp" element={<SignUp/>} />

                {/*  Protected Workspace Layer (All Logged-In Roles Can Access) */}
                <Route element={<ProtectedRoute allowedRoles={["Operator", "Manager", "Admin"]}/>}>
                    <Route path="/Overview" element={<Overview/>} />
                </Route>

                {/*  Strict Admin Sub-Layer (Only Admins Can Access) */}
                <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                    <Route path="/Admin/dashboard" element={<AdminDashboard/>} />
                </Route>

                {/* Fallback Catch-All Route */}
                <Route path="*" element={<Navigate to="/SignIn" replace />} />
            </Routes>
        </Router>
    );
};

export default App;