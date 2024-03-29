const express = require("express");
const router = express.Router();
const { Ratings } = require("../models");
const { Workers } = require("../models");
const { totalEvaluation } = require("../evaluation/evaluate");
const { Notifications } = require("../models");

router.put("/:id", async (req, res) => {
    const managerID = req.params.id;
    const rating = req.body.rating;
    const workerID = req.body.workerID;

    //console.log(workerID);
    const ratings = {
        ManagerManagerID: managerID,
        rating: rating,
        WorkerWorkerID: workerID
    }
    const worker = await Workers.findByPk(workerID);
    const old_kpi = worker.kpi;
    if (worker) {
        const ifExist = await Ratings.findOne({ where: { WorkerWorkerID: workerID } });
        if (!ifExist) {
            console.log("Create");
            await Ratings.create(ratings);
            await Workers.update({ kpi: ratings.rating }, { where: { workerID: workerID } });
            res.send("Inserted");
        } else {
            console.log("Update");
            await Ratings.update({ rating: ratings.rating, ManagerManagerID: ratings.ManagerManagerID }, { where: { WorkerWorkerID: ratings.WorkerWorkerID } });
            const new_kpi = rating * 0.1 + (old_kpi) * 0.9
            await Workers.update({ kpi: new_kpi }, { where: { workerID: workerID } });
            res.send("Inserted");
        }
        const notify = `Rating of ${workerID} updated`
        await Notifications.create(notify);
    } else {
        res.send("worker doesn't exist");

    }


});


router.get("/:id", async (req, res) => {
    const ratingList = await Ratings.findOne({ where: { WorkerWorkerID: req.params.id } });
    res.json(ratingList);
});

module.exports = router;