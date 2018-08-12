const Url = require('url');
const Client = require('./Client');
const Path = require('path');
const Message = require('./Message');
const Log4js = require('log4js');
let l = Log4js.getLogger(Path.basename(__filename));
l.level = 'ALL';

module.exports = class ClientsManager {
    constructor($wssServer, $fullStateDO){
        l.debug('New Client Manager');

        this.wss = $wssServer;
        this.fullStateDO = $fullStateDO;

        this.init();
    }

    originIsAllowed($origin){
        //TODO: Filter origins
        return true;
    }

    init() {
        this.wss.on('connection', ($connection, $req) => {
            l.debug('New Connection: ', $req.connection.remoteAddress);
            const location = Url.parse($req.url,true);
            l.info((new Date()) + ' Connection accepted: ' + $req.connection.remoteAddress);

            //Create new client obj
            let client = this.addClient($connection, $req);
            client.confirm();
        });

    };

    addClient($connection, $request){
        let client = new Client($connection, $request);

        client.on(Client.DISCONNECTED_EVENT, ($data) => {
            l.debug('Caught Disconnect: ' + client.id);
            this.removeClient(client.id);
        });

        client.on(Client.INFO_SET_EVENT, ($data) => {
            l.debug('Caught Client Info Set: ', $data);
            this.messageToOtherClients(client, 'remoteClientInfoSet', {
                clientId:client.id,
                clientName:$data.clientName,
                clientColor:$data.clientColor
            });

            this.messageToClient(client, 'fullStateUpdate', this.fullStateDO.fullState);
        });

        client.on(Client.CLIENT_UPDATE_EVENT, ($data) => {
            this.messageToOtherClients(client, 'remoteClientUpdate', {
                clientId: client.id,
                clientName: $data.clientName,
                clientColor: $data.clientColor,
                xPosList: $data.xPosList,
                yPosList: $data.yPosList,
                fieldValList: $data.fieldValList
            }) ;
        });

        this.fullStateDO.clientList.push(client);
        l.debug('Added Client: ', client.id);

        //Let other clients know
        l.debug(client.id);
        this.messageToOtherClients(client, 'remoteClientConnected',
            {
                clientId:client.id
            });

        return client;
    }

    removeClient($clientId){
        l.trace('Removing Client: ' + $clientId);
        let listLen = this.fullStateDO.clientList.length;
        let removedClient = null;
        for(let i = 0; i < listLen; i++){
            if(this.fullStateDO.clientList[i].id === $clientId){
                removedClient = this.fullStateDO.clientList.splice(i, 1)[0];
                l.debug('Removed Client: ', $clientId);
                break;
            }
        }

        if(removedClient == null){
            l.error('Failed to remove Client (not found): ', $clientId);
            return null;
        } else {
            this.messageToOtherClients(removedClient, 'remoteClientDropped', {clientId:removedClient.id});
            return removedClient;
        }

    }

    messageToOtherClients($excludedClient, $msgType, $msg) {
        for(let i = 0; i < this.fullStateDO.clientList.length; i++) {
            let client = this.fullStateDO.clientList[i];
            if(client !== $excludedClient) {
                this.messageToClient(client, $msgType, $msg);
            }
        }
    }

    messageToClient($client, $msgAction, $msgData) {
        if(!$client){
            l.error('No Client Provided, not sending message: ', $msgData);
            return null;
        }

        $client.sendMessage(new Message($msgAction, $msgData));
    }

    getClientById($clientId){
        let listLen = this.fullStateDO.clientList.length;

        for(let i = 0; i < listLen; i++){
            if(this.fullStateDO.clientList[i].clientId === $clientId){
                return this.fullStateDO.clientList[i];
            }
        }

        //Didn't find, return null
        l.warn('GetClientByID, could not find client: ' + $clientId);
        return null;
    }

    getClientIndex($clientId){
        for(let i = 0; i < listLen; i++) {
            if (this.fullStateDO.clientList[i].id === $clientId) {
                return i;
            }
        }

        l.warn('Could not get client index (not found)');
        return null;
    }

};