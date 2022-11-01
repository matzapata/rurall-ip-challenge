const { db } = require("../data/pg-db/index")

db.authenticate()
    .then(() => db.sync())
    .then(() => console.log('Db tables created successfully!')); 
