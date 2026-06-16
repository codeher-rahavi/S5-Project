const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");

// GET ALL MACHINES
router.get(
    "/",
    async (req, res) => {
        try {
            const machines =
                await Machine.find();
            res.json({
                success: true,
                machines
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
// ADD MACHINE
router.post(
    "/",
    async (req, res) => {
        try {
            const machine =
                await Machine.create(req.body);
            res.status(201).json({
                success: true,
                machine
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
module.exports = router;