const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const { Notifications } = require("../models");

router.get('/', async (req, res) => {
    const tenMinutesAgo = new Date(new Date() - 10 * 60 * 1000);
    console.log("Get notification");
    await Notifications.findAll({
        // where: {
        //     [Op.gt]: tenMinutesAgo,
        //     [Op.lt]: new Date()
        // },
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })


})

module.exports = router;