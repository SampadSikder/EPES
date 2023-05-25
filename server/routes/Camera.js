const express = require("express");
const router = express.Router();
const { Camera } = require("../models");

router.get("/:workplaceName", async (req, res) => {
    const workplaceName = req.params.workplaceName;
    const cameraURL = await Camera.findOne({ where: { workplaceName: workplaceName } })
    res.send(cameraURL);
})

router.get("/", async (req, res) => {
    const workplaces = await Camera.findAll();
    res.json(workplaces);
})

router.post("/", async (req, res) => {
    const workplaceName = req.body.assignedWorkplace;
    const cameraURL = req.body.cameraURL;
    await Camera.create({ workplaceName: workplaceName, cameraURL: cameraURL });
    res.send("Done");
})

module.exports = router;