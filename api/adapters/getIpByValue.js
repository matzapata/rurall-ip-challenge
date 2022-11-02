const { dbGetIpByAddress } = require("../data/pg-db")
const { cache } = require("../data/redis")

// Returns ip db instance ({ address: string, is_banned: boolean }) or null if not found
module.exports = async (ipAddress) => {
    const cacheData = await cache.GET(`ips:${ipAddress}`);
    if (cacheData !== null) return JSON.parse(cacheData);

    const dbData = await dbGetIpByAddress(ipAddress)
    return dbData
}

