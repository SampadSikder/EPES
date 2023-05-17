const express = require("express");
const router = express.Router();

const Notifications = require("../models");

router.get('/', async (req, res) => {
    const notification = await Notifications.findOne({
        where: { key },
        order: [['createdAt', 'DESC']],
    });
    res.json(notification);
})

module.exports = router;