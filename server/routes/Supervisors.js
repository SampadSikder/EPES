const express = require("express");
const router = express.Router();
const { Supervisors } = require("../models");

router.get("/", async (req, res) => {
    const listOfSupervisors = await Supervisors.findAll();
    res.send(listOfSupervisors);
});

router.post("/", async (req, res) => {

    const supervisor = req.body;
    console.log(supervisor);
    await Supervisors.create(supervisor);
    res.json("Success");

});


module.exports = router;