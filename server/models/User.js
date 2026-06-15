const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            "SuperAdmin",
            "FactoryAdmin",
            "Manager",
            "Technician",
            "Operator",
            "Viewer"
        ],
        default: "Operator"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    factoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Factory"
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    lastLogin: {
        type: Date
    }

});

UserSchema.pre("save", async function () {


    if (!this.isModified("password")) {
        return;
    }
    const salt =
        await bcrypt.genSalt(10);
    this.password =
        await bcrypt.hash(
            this.password,
            salt
        );
});

UserSchema.methods.matchPassword =
    async function (enteredPassword) {
        return await bcrypt.compare(
            enteredPassword,
            this.password
        );
    };

module.exports = mongoose.model("User", UserSchema);