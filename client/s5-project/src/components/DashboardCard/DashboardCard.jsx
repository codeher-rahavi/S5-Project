import React from "react";

const DashboardCard = ({ title, value, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>
            <h1 className="text-3xl font-bold mt-3 text-indigo-600">
                {value}
            </h1>
            <p className="text-gray-600 mt-2">
                {description}
            </p>
        </div>
    )
}
export default DashboardCard;