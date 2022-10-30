const bannedIps = require("../data/bannedIps.json").bannedIps

module.exports = async (ipAddress) => {
    return bannedIps.find((ip) => ip.ipAddress === ipAddress)
}
