const EventEmitter = require('events').EventEmitter;
const ShortId = require('shortid');
const Path = require('path');
const Log4js = require('log4js');
let l = Log4js.getLogger(Path.basename(__filename));
l.level = 'ALL';

//TODO: repeated connection tests (ping/pong)

module.exports = class Client extends EventEmitter {
    constructor($connection) {
        super();
        this.connection = $connection;
        this.ip = this.connection.address;
        this.id = ShortId.generate();

        l.debug('New Client: ' + this.ip, this.id);

        this.connection.on('close', ($code, $reason) => {
            l.info('Peer ' + this.connection.address + ' disconnected.');
            l.debug('ReasonCode: ', $code);
            l.debug('Reason: ', $reason);

            this.emit(Client.DISCONNECTED_EVENT);
        });
    }

    //TODO: Promisify message sending
    sendMessage($msgString){
        this.connection.send($msgString, ($err) => {
            if($err){
                l.error('Failed to Send from ' + this.id + ': ', $err);
            }
        });
    }

};

module.exports.DISCONNECTED_EVENT = 'disconnectedevent';


