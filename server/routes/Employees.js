const express = require("express");
const router = express.Router();
const { Employees } = require("../models");
const { Workers } = require("../models");
const { Supervisors } = require("../models");
const { Managers } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");


router.post("/", async (req, res) => {
    const { employeeID, password, type } = req.body;
    const ifEmployeeExist = await Employees.findOne({ where: { employeeID: employeeID } });
    if (ifEmployeeExist) {
        res.send("Already exists");
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            Employees.create({
                employeeID: employeeID,
                password: hash,
                type: type,
            });
            res.json("Completed");
        });
    }


});

router.delete("/", async (req, res) => {
    const employeeID = req.body.employeeID;


    const ifEmployeeExist = await Employees.findOne({ where: { employeeID: employeeID } });
    const ifWorkerExist = await Workers.findOne({ where: { workerID: employeeID } });
    if (ifEmployeeExist || ifWorkerExist) {
        await Employees.destroy({ where: { employeeID: employeeID } });
        await Workers.destroy({ where: { workerID: employeeID } });
        await Supervisors.destroy({ where: { supervisorID: employeeID } });
        await Managers.destroy({ where: { managerID: employeeID } });
        res.send("deleted");
    } else {
        res.send("Not found");
    }

})

router.post("/login", async (req, res) => {
    const { employeeID, password } = req.body;

    const id = await Employees.findOne({ where: { employeeID: employeeID } });

    if (id) {
        bcrypt.compare(password, id.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong employeeID or password" });
            } else {
                const accessToken = sign({
                    id: employeeID,
                    type: id.type
                }, "tokenTry");
                res.json(accessToken);
            }
        });
    } else {
        res.json({ error: "Wrong employeeID or password" });
    }


})

router.put("/editpassword", async (req, res) => {
    const { employeeID, password } = req.body;
    const ifEmployeeExist = await Employees.findOne({ where: { employeeID: employeeID } });
    if (ifEmployeeExist) {
        bcrypt.hash(password, 10).then((hash) => {
            Employees.update({
                password: hash,
            }, { where: { employeeID: employeeID } });
            res.json("Completed");
        });

    } else {
        res.send("Failed");
    }


});


module.exports = router;