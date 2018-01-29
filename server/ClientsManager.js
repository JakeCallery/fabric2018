const Url = require('url');
const Client = require('./Client');
const Path = require('path');
const Log4js = require('log4js');
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
            this.addClient($connection);
        });

        this.wss.on('message', ($msg) => {
            l.debug('Incoming Message: ', $msg);
        });

        this.wss.on('close', ($code, $reason) => {
            l.debug('Caught Client Close: ')
        });

    };

    addClient($connection){
        let client = new Client($connection);

        client.on(Client.DISCONNECTED_EVENT, ($data) => {
            l.debug('Caught Disconnect: ' + client.id);
            this.removeClient(client.id);
        });

        this.clientList.push(client);
        l.debug('Added Client: ', client.id);
    }

    removeClient($clientId){
        let listLen = this.clientList.length;
        for(let i = 0; i < listLen; i++){
            if(this.clientList[i].id === $clientId){
                this.clientList.splice(i, 1);
                l.debug('Removed Client: ', $clientId);
                break;
            }
        }

        l.error('Failed to remove Client (not found): ', $clientId);
        return null;
    }

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

        $client.sendMessage(JSON.stringify(message));
    }

    getClientById($clientId){
        let listLen = this.clientList.length;

        for(let i = 0; i < listLen; i++){
            if(this.clientList[i].clientId === $clientId){
                return this.clientList[i];
            }
        }

        //Didn't find, return null
        l.warn('GetClientByID, could not find client: ' + $clientId);
        return null;
    }

    getClientIndex($clientId){
        for(let i = 0; i < listLen; i++) {
            if (this.clientList[i].id === $clientId) {
                return i;
            }
        }

        l.warn('Could not get client index (not found)');
        return null;
    }

};