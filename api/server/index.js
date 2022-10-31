const  express 		= require('express');
const bodyParser  	= require('body-parser');
const server 		= express();
const helmet 		= require('helmet');
const cors          = require('cors');
const router        = require("../routes")

server.use(helmet());
server.use(cors());

// parse application/x-www-form-urlencoded 
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json 
server.use(bodyParser.json({limit: '50mb'}));

// Set trust proxy to true as required by bannedIpsMiddleware
server.set('trust proxy', true);

server.use("/api", router);

module.exports = server;
