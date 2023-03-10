const express = require("express");
const router = express.Router();
const { Workers } = require("../models");


const makeLeaderboard = (workers) => {
    const workerList = [];
    for (let i = 0; i < workers.length; i++) {
        workerList.push(workers[i].dataValues);
    }
    try {
        workerList.sort(function (a, b) {
            return a.kpi - b.kpi;
        });
        return workerList;
    } catch (err) {
        return null;
    }
}

router.get("/", async (req, res) => {
    const workers = await Workers.findAll();
    console.log(workers);
    const workerList = makeLeaderboard(workers);
    //console.log(workerList);
    if (workerList) {
        res.json(workerList);
    } else {
        res.send("KPI null");
    }



});

router.get("/:specialization", async (req, res) => {
    const specialization = req.params.specialization;
    const workers = await Workers.findOne({ where: { specialization: specialization } });
    if (workers) {
        const workerList = [];
        for (let i = 0; i < workers.length; i++) {
            workerList.push(workers[i].dataValues);
        }
    }
})

module.exports = router;