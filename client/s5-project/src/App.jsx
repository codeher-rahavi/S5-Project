import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // 🔄 FIX: Stripped out Router imports
import AdminDashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes/protectedRoutes";
import SignIn from "./pages/SignIn/signIn";
import SignUp from "./pages/SignUp/SignUp";
import Overview from "./pages/Overview/OverView";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Machines from "./pages/Machines/Machines";

function App() {
    return (
        // 🔄 FIX: Stripped <Router> container. This component now safely feeds straight into main.jsx context
        <Routes>
            <Route path="/" element={<Landing />} />
            {/* Public Routes */}
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Protected Workspace Layer (All Logged-In Roles Can Access) */}
            <Route element={<ProtectedRoute allowedRoles={["Operator", "Manager", "Admin"]} />}>
                <Route path="/Overview" element={<Overview />} />
            </Route>

            <Route

path="/machines"

element={

<ProtectedRoute>

<Machines/>

</ProtectedRoute>

}

/>

            {/* Strict Admin Sub-Layer (Only Admins Can Access) */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route path="/Admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Fallback Catch-All Route */}
            <Route path="*" element={<Navigate to="/SignIn" replace />} />
        </Routes>
    );
}

export default App;