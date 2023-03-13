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
    const ifManagerExist= await Managers.findOne({where:{managerID:manager.managerID}});
    if(!ifManagerExist){
        await Managers.create(manager);
        res.send("Success");
    }else{
        res.send("Already exists");
    }
    
});


module.exports = router;