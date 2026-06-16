import React from "react";

const AlertSummary = () => {
    const alerts = [
        {
            machine: "Motor 01",
            issue: "High vibration",
            level: "Critical"
        },
        {
            machine: "CNC 02",
            issue: "Temperature increase",
            level: "Warning"
        }
    ];
    return (
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">
                Recent Alerts
            </h2>
            <div className="mt-5 flex flex-col gap-4">
                {
                    alerts.map((alert, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-lg"
                        >
                            <p className="font-semibold">
                                {alert.machine}
                            </p>
                            <p>
                                {alert.issue}
                            </p>
                            <span className="text-red-600">
                                {alert.level}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default AlertSummary;