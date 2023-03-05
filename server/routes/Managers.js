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
    await Managers.create(manager);
    res.json("Success");


});


module.exports = router;