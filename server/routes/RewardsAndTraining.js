const express = require("express");
const router = express.Router();
const { Rewards } = require("../models");
const { Training } = require("../models");
const { Workers } = require("../models");

router.put("/rewards", async (req, res) => {
    const coupon = req.body.coupon;
    const workerID = req.body.workerID;
    console.log(workerID);
    const rewards = {
        coupon: coupon,
        WorkerWorkerID: workerID
    }
    const worker = await Workers.findByPk(workerID);
    if (worker) {
        const ifExist = await Rewards.findOne({ where: { WorkerWorkerID: workerID } });
        if (!ifExist) {
            console.log("Create");
            await Rewards.create(rewards);
            res.send("Inserted");
        } else {
            console.log("Update");
            await Rewards.update({ coupon: rewards.coupon }, { where: { WorkerWorkerID: rewards.WorkerWorkerID } });
            res.send("Inserted");
        }

    } else {
        res.send("worker doesn't exist");

    }
});

router.put("/training", async (req, res) => {
    const workerID = req.body.workerID;
    console.log(workerID);
    const training = {
        WorkerWorkerID: workerID
    }
    const worker = await Workers.findByPk(workerID);
    if (worker) {
        const ifExist = await Training.findOne({ where: { WorkerWorkerID: workerID } });
        if (!ifExist) {
            console.log("Create");
            await Training.create(training);
            res.send("Inserted");
        } else {
            res.send("Already training");
        }

    } else {
        res.send("worker doesn't exist");

    }
});

router.get("/rewards", async (req, res) => {
    const rewardList = await Rewards.findAll();
    res.json(rewardList);
});

router.get("/training", async (req, res) => {
    const trainingList = await Training.findAll();
    res.json(trainingList);
});


module.exports = router;