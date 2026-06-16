import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import SensorChart from "../../components/SensorChart/SensorChart";
import HealthChart from "../../components/HealthChart/HealthChart";
import AlertSummary from "../../components/AlertSummary/AlertSummary";
import MachineStatus from "../../components/MachineStatus/MachineStatus";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <div className="flex-1 p-10">
                <h1 className="text-4xl font-bold text-slate-800">
                    Factory Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                    Real-time machine health monitoring system
                </p>
                <div className="grid md:grid-cols-4 gap-6 mt-10">
                    <DashboardCard
                        title="Total Machines"
                        value="120"
                        description="Registered machines"
                    />
                    <DashboardCard
                        title="Running Machines"
                        value="108"
                        description="Currently operational"
                    />
                    <DashboardCard
                        title="Critical Alerts"
                        value="5"
                        description="Require attention"
                    />
                    <DashboardCard
                        title="Health Score"
                        value="92%"
                        description="Overall factory health"
                    />
                </div>

                <MachineStatus />

                <div className="grid lg:grid-cols-2 gap-8 mt-10">
                    <SensorChart />
                    <HealthChart />
                </div>
                <div className="mt-10">
                    <AlertSummary />
                </div>
            </div>
        </div>
    )

}
export default Dashboard;