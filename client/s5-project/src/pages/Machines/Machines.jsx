import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MachineCard from "../../components/MachineCard/MachineCard";

const Machines = () => {
    const machines = [
        {
            name: "CNC Machine 01",
            type: "CNC",
            status: "Running",
            health: 95
        },
        {
            name: "Motor Unit 02",
            type: "Motor",
            status: "Warning",
            health: 65
        },
        {
            name: "Robot Arm",
            type: "Automation",
            status: "Critical",
           health: 30
        }
    ];
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold">
                    Machines
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage and monitor factory machines
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {
                        machines.map((machine, index) => (
                            <MachineCard
                                key={index}
                                machine={machine}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Machines;