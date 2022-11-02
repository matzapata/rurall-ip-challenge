const { dbSetIp } = require("../data/pg-db")
const { cache, cacheSetIp } = require("../data/redis")

// Saves ip to db and cache
module.exports = async (ipAddress, isBanned) => {
    const dbData = await dbSetIp(ipAddress, isBanned)
    await cacheSetIp({ id: dbData.id, ipAddress, isBanned })
    return dbData
}