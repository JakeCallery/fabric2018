const Url = require('url');
const Log4js = require('log4js');
const Client = require('./Client');
const Path = require('path');
let l = Log4js.getLogger(Path.basename(__filename));
l.level = 'ALL';

module.exports = class ClientsManager {
    constructor($wssServer){
        l.debug('New Client Manager');

        this.wss = $wssServer;
        this.clientList = [];

        this.init();
    }

    originIsAllowed($origin){
        //TODO: Filter origins
        return true;
    }

    init() {
        this.wss.on('connection', ($connection, $req) => {
            l.debug('New Connection: ', $connection);
            const location = Url.parse($req.url,true);
            l.info((new Date()) + ' Connection accepted: ' + $req.connection.remoteAddress);

            let client = new Client($connection);

        });
    };

    messageToClient($client, $msgType, $msg) {
        if(!$client){
            l.error('No Client Provided, not sending message: ', $msg);
            return null;
        }

        let message = {
            messageType: $msgType,
            clientId: $client.clientId,
            message: $msg
        };

        $client.connection.send(JSON.stringify(message));

    }

    getClientById($clientId){
        let listLen = this.clientList.length;

        for(let i = 0; i < listLen; i++){
            if(this.clientList[i].clientId === $clientId){
                return this.clientList[i];
            }
        }

        //Didin't find, return null
        l.warn('GetClientByID, could not find client: ' + $clientId);
        return null;
    }

};