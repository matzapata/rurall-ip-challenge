const express = require('express');
const router = express.Router();

const bannedIpsMiddleware = require('../middlewares/bannedIpsMiddleware');
const ipData = require("../domain/ipData")
const getIpCountryData = require("../adapters/getIpCountryData")
const getCurrencyValuation = require("../adapters/getCurrencyValuation")

router.get("/ip-country-data/:ip", bannedIpsMiddleware, async (req, res) => {
    try {
        const ipAddress = req.params.ip;
        const ipCountryData = await ipData({ getCurrencyValuation, getIpCountryData }, { ipAddress })

        return res.status(200).send({
            message: "Successfully looked up ip data",
            data: { ...ipCountryData }
        })
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
})

module.exports = router;