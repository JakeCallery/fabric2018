const EventEmitter = require('events').EventEmitter;
const ShortId = require('shortid');
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

        l.debug('New Client: ' + this.ip, this.id);

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
    sendMessage($msgString){
        this.connection.send($msgString, ($err) => {
            if($err){
                l.error('Failed to Send from ' + this.id + ': ', $err);
            }
        });
    }

};

module.exports.DISCONNECTED_EVENT = 'disconnectedevent';


