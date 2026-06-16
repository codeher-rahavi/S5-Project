import React from "react";

const MachineStatus = () => {
    const machines = [
        {
            name: "CNC Machine 01",
            status: "Running",
            color: "text-green-600"
        },
        {
            name: "Motor Unit 02",
            status: "Warning",
            color: "text-yellow-600"
        },
        {
            name: "Assembly Robot",
            status: "Critical",
            color: "text-red-600"
        }
    ];
    return (
        <div className="bg-white mt-10 rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold">
                Live Machine Status
            </h2>
            <div className="mt-5 grid md:grid-cols-3 gap-5">
                {
                    machines.map((machine, index) => (
                        <div
                            key={index}
                            className="border p-5 rounded-lg"
                        >
                            <h3 className="font-semibold">
                                {machine.name}
                            </h3>
                            <p className={machine.color}>
                                ● {machine.status}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default MachineStatus;