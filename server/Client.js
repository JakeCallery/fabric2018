const EventEmitter = require('events').EventEmitter;
const ShortId = require('shortid');
const Message = require('./Message');
const Path = require('path');
const Log4js = require('log4js');
let l = Log4js.getLogger(Path.basename(__filename));
l.level = 'ALL';

//TODO: repeated connection tests (ping/pong)

module.exports = class Client extends EventEmitter {
    constructor($connection, $request) {
        super();
        this.connection = $connection;
        this.request = $request;
        this.ip = this.request.connection.remoteAddress;
        this.id = ShortId.generate();
        this.name = null;
        this.color = null;

        l.debug('New Client: ' + this.ip, this.id);

        this.connection.on('message', ($msg) => {
            l.debug('Caught Message: ', $msg);
            let msgObj = null;

            try {
                msgObj = JSON.parse($msg);
            } catch ($e) {
                l.error('Message Parse Failed', $msg);
            }

            if(msgObj !== null){
                switch(msgObj.action) {
                    case 'setInfo':
                        l.debug('Caught Set Info: ', msgObj.data.name, msgObj.data.color);
                        this.name = msgObj.data.name;
                        this.color = msgObj.data.color;

                        let info = {
                            name:this.name,
                            color:this.color
                        };

                        this.sendMessage(new Message('localClientInfoSet',info));

                        this.emit(Client.INFO_SET_EVENT, info);
                        break;

                    case 'ping':
                        l.trace('Caught Ping...');
                        break;

                    default:
                        l.error('Unhandled Message Action: ', msgObj.action);
                }

                this.emit(Client.NEW_MESSAGE_EVENT, $msg);
            }
        });

        this.connection.on('close', ($code, $reason) => {
            l.info('Peer ' + this.ip + ' / ' + this.id + ' disconnected.');
            l.debug('ReasonCode: ', $code);
            l.debug('Reason: ', $reason);

            this.emit(Client.DISCONNECTED_EVENT);
        });

        this.connection.on('error', ($err, $reason) => {
            l.warn('Connection Error Code: ', $err.code);
            if($err.code === 'ECONNRESET'){
                l.warn('Client went away abruptly: ', this.ip, this.id);
            }
        });
    }

    //TODO: Promisify message sending
    sendMessage($messageObj){
        $messageObj.content.clientId = this.id;
        let msgString = $messageObj.serialize();
        this.connection.send(msgString, ($err) => {
            if($err){
                l.error('Failed to Send from ' + this.id + ': ', $err);
            }
        });
    }

    confirm() {
        l.debug('Confirming Client: ' + this.id);
        let confirmMessage = new Message('localClientConfirmed', {clientId:this.id});
        this.sendMessage(confirmMessage);
    }

};

module.exports.DISCONNECTED_EVENT = 'disconnectedevent';
module.exports.NEW_MESSAGE_EVENT = 'newmessageevent';
module.exports.INFO_SET_EVENT = 'infosetevent';

