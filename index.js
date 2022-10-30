const server = require('./server');
require('dotenv').config()
const redisClient = require("./data/redisClient")

redisClient.connect()
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server running on  http://localhost:${process.env.PORT}`)
        });
    })
