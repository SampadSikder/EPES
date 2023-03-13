const express = require("express");
const router = express.Router();
const { Workers } = require("../models");

router.get("/", async (req, res) => {
    const listOfWorkers = await Supervisors.findAll();
    res.send(listOfWorkers);
});

router.post("/", async (req, res) => {

    const worker = req.body;
    console.log(worker);
    const ifWorkerExist = await Workers.findOne({ where: { workerID: worker.workerID } });
    if (!ifWorkerExist) {
        await Workers.create(worker);
        res.send("Success");
    } else {
        res.send("Already exists");
    }

});


module.exports = router;