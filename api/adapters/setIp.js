const { dbSetIp } = require("../data/pg-db")

// Saves ip to db and cache
module.exports = async (ipAddress, isBanned) => {
    const dbData = await dbSetIp(ipAddress, isBanned)
    return dbData
}