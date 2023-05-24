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

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Notifications.destroy({ where: { id: id } });
    res.json("Done");
})

module.exports = router;