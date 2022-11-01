require('dotenv').config()
const server = require('./server');
const { cache } = require("./data/redis")
const { db } = require("./data/pg-db")

cache.connect()
    .then(() => console.log('Redis connection has been established successfully.'))
    .then(() => db.authenticate())
    .then(() => console.log('Postgres connection has been established successfully.'))
    .then(() => server.listen(process.env.PORT, () => {
        console.log(`Server running on  http://localhost:${process.env.PORT}`)
    }))
    .catch(e => console.error(e))
