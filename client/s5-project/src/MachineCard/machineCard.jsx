import React from "react";

const MachineCard = ({ machine }) => {
    return (
        <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-xl font-semibold">
                {machine.name}
            </h2>
            <p className="text-gray-500 mt-2">
                Type: {machine.type}
            </p>
            <p className="mt-2">
                Status:
                <span
                    className={`ml-2 font-semibold ${machine.status === "Running"
                            ?
                            "text-green-600"
                            :
                            "text-red-600"
                        }`}
                >
                    {machine.status}
                </span>
            </p>
            <p className="mt-2">
                Health Score:
                {machine.health}%
            </p>
            <button
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
                View Details
            </button>
        </div>
    )
}
export default MachineCard;