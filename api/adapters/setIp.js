const { dbSetIp } = require("../data/pg-db")
const { cache } = require("../data/redis")

// Saves ip to db and cache
module.exports = async (ipAddress, isBanned) => {
    const dbData = await dbSetIp(ipAddress, isBanned)
    await cache.SET(`ips:${ipAddress}`, JSON.stringify({ id: dbData.id, address: ipAddress, is_banned: isBanned }))
    return dbData
}