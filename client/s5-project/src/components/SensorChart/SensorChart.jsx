import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


const SensorChart = () => {
    const data = [
        {
            time: "10:00",
            temperature: 60
        },
        {
            time: "10:10",
            temperature: 65
        },
        {
            time: "10:20",
            temperature: 70
        },
        {
            time: "10:30",
            temperature: 75
        },
        {
            time: "10:40",
            temperature: 72
        }
    ];
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-5">
                Temperature Monitoring
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}


export default SensorChart;