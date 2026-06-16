import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";


const HealthChart = () => {
    const data = [
        {
            name: "Healthy",
            value: 70
        },
        {
            name: "Warning",
            value: 20
        },
        {
            name: "Critical",
            value: 10
        }
    ];
    return (
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5">
                Machine Health
            </h2>
            <PieChart width={300} height={250}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={index} />
                        ))
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}
export default HealthChart;