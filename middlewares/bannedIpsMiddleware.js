const isIpBanned = require("../domain/isIpBanned")
const getBannedIpByValue = require("../adapters/getBannedIpByValue")

module.exports = async (req, res, next) => {
    const ipAddress = req.ip;

    if (await isIpBanned({ getBannedIpByValue }, { ipAddress }) === true) 
        return res.status(403).send("Request ip is banned")
    else next();
}