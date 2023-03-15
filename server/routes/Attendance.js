const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");

router.put("/", async (req, res) => {
    const attendance = {
        present: req.body.present,
        WorkerWorkerID: req.body.workerID
    }
    const ifExist = await Attendance.findOne({ where: { WorkerWorkerID: req.body.workerID } });
    if (ifExist) {
        await Attendance.update({ present: attendance.present }, { where: { WorkerWorkerID: attendance.WorkerWorkerID } });
        res.send("Updated");
    } else {
        await Attendance.create(attendance);
        res.send("Inserted");
    }
});

router.get("/", async (req, res) => {
    const attendanceList = await Attendance.findAll();
    res.json(attendanceList);
});


module.exports = router;