const http = require('http');
const path = require('path');
const url = require('url');
const express = require('express');
const WebSocket = require('ws');
const Client = require('./Client');
const ClientsManager = require('./ClientsManager');
const Path = require('path');
const Log4js = require('log4js');

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
const cm = new ClientsManager(wss);

/*function originIsAllowed($origin) {
    //TODO: filter origins
    return true;
}

wss.on('connection', ($connection, $req) => {
    const location = url.parse($req.url, true);

    console.log((new Date()) + ' Connection accepted: ' + $req.connection.remoteAddress);
    connections.push($connection);

    $connection.on('message', ($msg) => {
        let msgType = typeof $msg;
        console.log('Sending message of Type: ', msgType);

        //Send message to other clients
        for (let i = 0; i < connections.length; i++) {
            let conn = connections[i];
            if (conn !== $connection) {
                conn.send($msg);
            }
        }
        //console.log('Message: ', $msg);
    });

$connection.on('close', ($code, $reason) => {
    console.log((new Date()) + ' Peer ' + $connection.address + ' disconnected.');
console.log('ReasonCode: ', $code);
console.log('Desc: ', $reason);

//Remove connection
console.log('Removing Connection from pool');
for(let i = 0; i < connections.length; i++){
    if(connections[i] === $connection){
        console.log('Removing Connection: ', i);
        connections.splice(i, 1);
    }
}
});

});*/

server.listen(8888, () => {
    console.log('Listening on %d', server.address().port);
});