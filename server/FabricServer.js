const http = require('http');
const path = require('path');
const url = require('url');
const express = require('express');
const WebSocket = require('ws');
const Client = require('./Client');
const ClientsManager = require('./ClientsManager');
const Path = require('path');
const Log4js = require('log4js');
const FullStateDO = require('./FullStateDO');

//Set up logging
let l = Log4js.getLogger(Path.basename(__filename));
l.level = 'DEBUG';
l.debug('Log Started');

let connections = [];

//Setup Express App (web requests)
const app = express();
app.use('/', express.static(path.join(__dirname + '/../dist')));

//Setup Websocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({
    server:server
});

//Setup Managers
const fullStateDO = new FullStateDO();
const cm = new ClientsManager(wss, fullStateDO);

//Start Listening
server.listen(8888, () => {
    console.log('Listening on %d', server.address().port);
});