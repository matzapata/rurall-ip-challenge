const express = require('express');
const bannedIpsMiddleware = require('../middlewares/bannedIpsMiddleware');
const router = express.Router();

router.get("/ip-country-data/:ip", bannedIpsMiddleware, (req, res) => {
    return res.status(200).send("OK")
})

module.exports = router;