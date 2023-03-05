const express = require("express");
const router = express.Router();
const { Employees } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { employeeID, password, type } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        Employees.create({
            employeeID: employeeID,
            password: hash,
            type: type,
        });
        res.json("Completed");
    })

});

router.post("/login", async (req, res) => {
    const { employeeID, password } = req.body;

    const id = await Employees.findOne({ where: { employeeID: employeeID } });

    if (id) {
        bcrypt.compare(password, id.password).then((match) => {
            if (!match) {
                res.json("Wrong employeeID or password");
            } else {
                res.json("Logged in");
            }
        });
    } else {
        res.json("Wrong employeeID or password");
    }


})


module.exports = router;