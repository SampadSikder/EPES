const express = require("express");
const router = express.Router();
const { Workers } = require("../models");



router.get("/", async (req, res) => {
    const listOfWorkers = await Workers.findAll();
    res.send(listOfWorkers);
});

router.post("/", async (req, res) => {

    const worker = req.body;
    console.log(worker);
    const ifWorkerExist = await Workers.findOne({ where: { workerID: worker.workerID } });
    if (ifWorkerExist) {
        res.send("Worker exist");
    } else {
        await Workers.create(worker);
        res.send("Success");
    }

});
router.get("/:id", async (req, res) => {
    const listOfWorkers = await Workers.findOne({ where: { workerID: req.params.id } });
    res.send(listOfWorkers);
});

module.exports = router;