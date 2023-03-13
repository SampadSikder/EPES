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
    const ifSupervisorExist = await Supervisors.findOne({ where: { supervisorID: supervisor.supervisorID } });
    if (!ifSupervisorExist) {
        await Supervisors.create(supervisor);
        res.send("Success");
    } else {
        res.send("Already exists");
    }

});


module.exports = router;