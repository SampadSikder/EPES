const express = require("express");
const router = express.Router();
const { Managers } = require("../models");

router.get("/", async (req, res) => {
    const listOfManagers = await Managers.findAll();
    res.send(listOfManagers);
});

router.post("/", async (req, res) => {
    const manager = req.body;
    console.log(manager);
    const ifManagerExist = await Managers.findOne({ where: { managerID: manager.managerID } });
    if (ifManagerExist) {
        res.send("Already exists");
    } else {
        await Managers.create(manager);
        res.send("Success");
    }
});

router.get("/:id", async (req, res) => {
    const listOfManagers = await Managers.findOne({ where: { managerID: req.params.id } });
    res.send(listOfManagers);
});


module.exports = router;