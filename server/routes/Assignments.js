const express = require("express");
const router = express.Router();
const { Assignments } = require("../models");
const { Workers } = require("../models");

router.put("/:id", async (req, res) => {
    const managerID = req.params.id;
    const workplace = req.body;
    workplace['ManagerManagerID'] = managerID;
    workplace['WorkerWorkerID'] = workplace.workerID;
    console.log(workplace);
    const worker = await Workers.findByPk(workplace.workerID);
    if (worker) {
        const ifExist = await Assignments.findOne({ where: { WorkerWorkerID: workplace.workerID } });
        if (!ifExist) {
            await Assignments.create(workplace);
            res.send("Inserted");
        } else {
            await Assignments.update({ ManagerManagerID: workplace.ManagerManagerId }, { where: { WorkerWorkerID: workplace.workerID } });
            await Assignments.update({ assignedWorkplace: workplace.assignedWorkplace }, { where: { WorkerWorkerID: workplace.workerID } });
            res.send("Updated");
        }

    } else {
        res.send("worker doesn't exist");
    }
});
router.get("/:id", async (req, res) => {
    const assignmentList = await Assignments.findOne({ where: { WorkerWorkerID: req.params.body } });
    res.json(assignmentList);
});

module.exports = router;