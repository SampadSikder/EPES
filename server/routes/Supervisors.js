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
    if (ifSupervisorExist) {
        res.send("Already exists!");
    } else {
        await Supervisors.create(supervisor);
        res.send("Success");
    }

});
router.get("/:id", async (req, res) => {
    const listOfSupervisors = await Supervisors.findOne({ where: { supervisorID: req.params.id } });
    res.send(listOfSupervisors);
});

module.exports = router;