const server = require('./server');
require('dotenv').config()

server.listen(process.env.PORT, () => {
    console.log(`Server running on  http://localhost:${process.env.PORT}`)
});

server.on('error', err => {
    console.error(err);
});