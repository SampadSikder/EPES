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
    await Workers.create(worker);
    res.json("Success");

});


module.exports = router;