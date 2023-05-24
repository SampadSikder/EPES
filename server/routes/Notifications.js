const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const { Notifications } = require("../models");

router.get('/', async (req, res) => {
    await Notifications.findAll({
        order: [['createdAt', 'DESC']], // Order the notifications by the creation date in descending order
        limit: 3, // Adjust the limit to the desired number of latest notifications
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;