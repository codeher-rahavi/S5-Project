const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
    machineId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        enum: [
            "Running",
            "Warning",
            "Critical",
            "Offline"
        ],
        default: "Offline"
    },
    temperature: {
        type: Number,
        default: 0
    },
    vibration: {
        type: Number,
        default: 0
    },
    rpm: {
        type: Number,
        default: 0
    },
    healthScore: {
        type: Number,
        default: 100
    },
    lastMaintenance: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports =
    mongoose.model(
        "Machine",
        MachineSchema
    );