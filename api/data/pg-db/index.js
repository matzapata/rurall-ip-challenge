const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize("postgres://postgres:postgres@pg:5432/ips-database");

const Ips = db.define('Ips', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

const dbSetIp = async (ipAddress, isBanned) => {
    const [ip] = await Ips.upsert({ address: ipAddress, is_banned: isBanned })
    return ip;
}

const dbGetIpByAddress = async (ipAddress) => {
    const ip = await Ips.findOne({ where: { address: ipAddress } })
    return ip;
}


module.exports = {
    db,
    Ips,
    dbSetIp,
    dbGetIpByAddress
}
