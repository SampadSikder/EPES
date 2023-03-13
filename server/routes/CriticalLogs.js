const express = require("express");
const router = express.Router();
const { CriticalLogs } = require("../models");
const { Workers } = require("../models");

router.post("/:id", async (req, res) => {
    const managerID = req.params.id;
    const criticalLog = req.body;
    console.log(criticalLog);
    criticalLog['ManagerManagerID'] = managerID;
    criticalLog['WorkerWorkerID'] = criticalLog.workerID;
    const worker = await Workers.findByPk(criticalLog.workerID);
    if (worker) {
        await CriticalLogs.create(criticalLog);
        res.send("Inserted");
    } else {
        res.send("worker doesn't exist");
    }

});

router.get("/:id", async (req, res) => {
    const criticalLogs = await CriticalLogs.findAll({ where: { WorkerWorkerID: req.params.id } });
    res.json(criticalLogs);
})

module.exports = router;