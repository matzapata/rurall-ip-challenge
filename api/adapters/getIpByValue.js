const { dbGetIpByAddress } = require("../data/pg-db")
const { cacheGetIp } = require("../data/redis")

// Returns ip db instance ({ address: string, is_banned: boolean }) or null if not found
module.exports = async (ipAddress) => {
    const cacheData = await cacheGetIp({ ipAddress })
    if (cacheData !== null) return cacheData;

    const dbData = await dbGetIpByAddress(ipAddress)
    return dbData
}

