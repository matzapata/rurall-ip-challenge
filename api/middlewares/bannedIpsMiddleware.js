const isIpBanned = require("../domain/isIpBanned")
const getIpByValue = require("../adapters/getIpByValue")
const setIp = require("../adapters/setIp")

module.exports = async (req, res, next) => {
    const ipAddress = req.ip;

    if (await isIpBanned({ getIpByValue, setIp }, { ipAddress }) === true)
        return res.status(403).send({ message: "Request ip is banned" })
    else next();
}