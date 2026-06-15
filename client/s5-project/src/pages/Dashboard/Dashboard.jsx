import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

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
                <div className="bg-white mt-10 rounded-xl shadow p-8">
                    <h2 className="text-2xl font-semibold">
                        Live Machine Status
                    </h2>
                    <div className="mt-5 grid md:grid-cols-3 gap-5">
                        <div className="border p-5 rounded-lg">
                            <h3 className="font-semibold">
                                CNC Machine 01
                            </h3>
                            <p className="text-green-600">
                                ● Running
                            </p>
                        </div>
                        <div className="border p-5 rounded-lg">
                            <h3 className="font-semibold">
                                Motor Unit 02
                            </h3>
                            <p className="text-yellow-600">
                                ● Warning
                            </p>
                        </div>
                        <div className="border p-5 rounded-lg">
                            <h3 className="font-semibold">
                                Assembly Robot
                            </h3>
                            <p className="text-red-600">
                                ● Critical
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Dashboard;