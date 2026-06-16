import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes/protectedRoutes";

import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/SignIn/signIn";
import SignUp from "./pages/SignUp/SignUp";

import Dashboard from "./pages/Dashboard/Dashboard";
import Overview from "./pages/Overview/OverView";
import Machines from "./pages/Machines/Machines";

import Alerts from "./pages/Alerts/Alerts";
import Maintenance from "./pages/Maintenance/Maintenance";
import Reports from "./pages/Reports/Reports";

function App() {
    return (
        <Routes>
            {/* Public Pages */}
            <Route
                path="/"
                element={<Landing />}
            />
            <Route
                path="/SignIn"
                element={<SignIn />}
            />
            <Route
                path="/SignUp"
                element={<SignUp />}
            />
            {/* Protected Pages */}
            <Route
                path="/Dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/Overview"
                element={
                    <ProtectedRoute>
                        <Overview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/Machines"
                element={
                    <ProtectedRoute>
                        <Machines />
                    </ProtectedRoute>
                }
            />
            {/* Admin Route */}
            <Route
                path="/Admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alerts"
                element={
                    <ProtectedRoute>
                        <Alerts />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/maintenance"
                element={
                    <ProtectedRoute>
                        <Maintenance />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <Reports />
                    </ProtectedRoute>
                }
            />
            {/* Invalid URL */}
            <Route
                path="*"
                element={<Navigate to="/SignIn" replace />}
            />
        </Routes>
    );
}
export default App;