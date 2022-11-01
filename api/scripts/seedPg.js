const { db, Ips } = require('../data/pg-db')

db.authenticate()
    .then(() => console.log('Postgres connection has been established successfully.'))
    .then(() => Ips.create({ address: '181.167.175.218', is_banned: false }))
    .then(() => Ips.create({ address: '181.167.175.217', is_banned: true }))
    .then(() => console.log("seed ips db"))
    .catch((e) => console.error(e))
    