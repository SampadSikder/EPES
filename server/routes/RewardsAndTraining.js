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
        type: req.body.type,
        WorkerWorkerID: workerID
    }
    const worker = await Workers.findByPk(workerID);
    if (worker) {

        const ifExist = await Training.findOne({ where: { WorkerWorkerID: workerID } });
        await Training.create(training);
        if (!ifExist) {
            console.log("Create");
            res.send("Inserted");
        } else {
            res.send("Already training");
        }

    } else {
        res.send("worker doesn't exist");

    }
});

router.put("/deltraining", async (req, res) => {
    const workerID = req.body.workerID;
    const training = {
        type: req.body.type,
        WorkerWorkerID: workerID
    }
    await Training.destroy({
        where: {
            type: req.body.type,
            WorkerWorkerID: workerID
        }
    })
    res.send("success");
});

router.get("/rewards", async (req, res) => {
    const rewardList = await Rewards.findAll();
    res.json(rewardList);
});

router.get("/training", async (req, res) => {
    const trainingList = await Training.findAll();
    res.json(trainingList);
});

router.get("/rewards/:id", async (req, res) => {
    const id = req.params.id;
    const rewardList = await Rewards.findAll({ where: { WorkerWorkerID: id } });
    res.json(rewardList);
});

router.get("/training/:id", async (req, res) => {
    const trainingList = await Training.findAll({ where: { WorkerWorkerID: req.params.id } });
    res.json(trainingList);
});


module.exports = router;