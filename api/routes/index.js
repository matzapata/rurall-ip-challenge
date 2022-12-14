const express = require('express');
const router = express.Router();

const bannedIpsMiddleware = require('../middlewares/bannedIpsMiddleware');
const ipData = require("../domain/ipData")
const getIpCountryData = require("../adapters/getIpCountryData")
const getCurrencyValuation = require("../adapters/getCurrencyValuation");
const setIp = require('../adapters/setIp');
const IpEntity = require('../entities/Ip');

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

router.post("/ip-blacklist", async (req, res) => {
    const ipAddress = req.body.ipAddress
    const ip = new IpEntity(ipAddress);
    if (!ip.validate()) return res.status(400).send("Invalid ip")
    
    try {    

        await setIp(ipAddress, true);
        return res.status(200).send({ message: "OK" })
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
})

module.exports = router;