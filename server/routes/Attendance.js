const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { Workers } = require("../models");
router.put("/", async (req, res) => {
    try {
        const attendanceList = req.body;

        attendanceList.forEach(async (attendance) => {
            const { workerID, present } = attendance;
            const ifExist = await Attendance.findOne({ where: { WorkerWorkerID: workerID } });
            if (ifExist) {
                await Attendance.update({ present: present }, { where: { WorkerWorkerID: workerID } });
            } else {
                await Attendance.create({ WorkerWorkerID: workerID, present: present });
            }
        });

        res.send("Attendance updated");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.get("/", async (req, res) => {
    const workerList = await Workers.findAll();
    const presentWorkers = []
    for (const worker of workerList) {
        const ifExist = await Attendance.findOne({ where: { WorkerWorkerID: worker.workerID } });
        if (ifExist && ifExist.dataValues.present) {
            presentWorkers.push(worker);
        }
    }
    //console.log(presentWorkers);
    res.json(presentWorkers);
});




module.exports = router;