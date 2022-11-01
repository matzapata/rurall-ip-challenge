const { dbGetIpByAddress } = require("../data/pg-db")

// Returns ip db instance ({ address: string, is_banned: boolean }) or null if not found
module.exports = async (ipAddress) => {
    // Check cache first
    const dbData = await dbGetIpByAddress(ipAddress)
    return dbData
}

