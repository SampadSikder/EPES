const express = require("express");
const router = express.Router();
const { Assignments } = require("../models");
const { Workers } = require("../models");
const { Notifications } = require("../models");


router.post("/", async (req, res) => {
    const newWorkplace = req.body.assignedWorkplace;
    const workplaceType = req.body.workplaceType;

    try {
        await Assignments.create({
            assignedWorkplace: newWorkplace,
            workplaceType: workplaceType
        });
        const notify = "New workplace created successfully";
        await Notifications.create({
            notification: notify
        });
        res.send("Inserted workplace");
    } catch (err) {

        res.json("Already exists!");
    }


}
);

router.put("/:id", async (req, res) => {
    const managerID = req.params.id;
    const workplace = req.body;
    workplace['ManagerManagerID'] = managerID;
    workplace['WorkerWorkerID'] = workplace.workerID;
    console.log(workplace);
    const worker = await Workers.findByPk(workplace.workerID);
    if (worker) {
        try {
            await Assignments.update({ ManagerManagerID: workplace.ManagerManagerID, WorkerWorkerID: workplace.WorkerWorkerID }, { where: { assignedWorkplace: workplace.assignedWorkplace } });
            console.log(workplace.assignedWorkplace);
            await Workers.update({ assignedWorkplace: workplace.assignedWorkplace }, { where: { workerID: workplace.WorkerWorkerID } });
            const notification = `Worker ${workplace.WorkerWorkerID} assigned to ${workplace.assignedWorkplace}`;
            await Notifications.create({ notification: notification });
            res.json("Assignment updated!");
        } catch (err) {
            res.send(err);
        }


    } else {
        res.send("worker doesn't exist");
    }


})

    ;

// router.put("/:id", async (req, res) => {
//     const managerID = req.params.id;
//     const workplace = req.body;
//     workplace['ManagerManagerID'] = managerID;
//     workplace['WorkerWorkerID'] = workplace.workerID;
//     console.log(workplace);
//     const worker = await Workers.findByPk(workplace.workerID);
//     if (worker) {
//         const ifExist = await Assignments.findOne({ where: { WorkerWorkerID: workplace.workerID } });
//         if (!ifExist) {
//             await Assignments.create(workplace);
//             res.send("Inserted");
//         } else {
//             await Assignments.update({ ManagerManagerID: workplace.ManagerManagerId }, { where: { WorkerWorkerID: workplace.workerID } });
//             await Assignments.update({ assignedWorkplace: workplace.assignedWorkplace }, { where: { WorkerWorkerID: workplace.workerID } });
//             await Workers.update({ assignedWorkplace: workplace.assignedWorkplace }, { where: { workerID: workplace.workerID } })
//             res.send("Updated");
//         }

//     } else {
//         res.send("worker doesn't exist");
//     }
// });
router.get("/", async (req, res) => {
    const assignedWorkplaces = await Assignments.findAll({
        attributes: ['assignedWorkplace'],
        where: { WorkerWorkerID: null }
    });
    res.json(assignedWorkplaces);
});

router.get("/assignments", async (req, res) => {
    const assignmentList = await Assignments.findAll();
    res.json(assignmentList);
});

router.put("/startMonitoring/:id", async (req, res) => {
    const monitoringStatus = req.body.monitoringStatus;
    const workerId = req.params.id;
    console.log(workerId);
    console.log(monitoringStatus);
    await Assignments.update({
        monitoringStatus: monitoringStatus
    }, { where: { WorkerWorkerID: workerId } });

    if (monitoringStatus === false) {
        const notify = `Monitoring of Worker ${workerId} has stopped`;
        await Notifications.create({
            notification: notify
        });
    } else {
        const notify = `Worker ${workerId} is being monitored`;
        await Notifications.create({
            notification: notify
        });
    }

    res.json("Updated!");
});

router.get("/monitoring", async (req, res) => {
    const assignmentList = await Assignments.findAll();
    res.json(assignmentList);
});


module.exports = router;