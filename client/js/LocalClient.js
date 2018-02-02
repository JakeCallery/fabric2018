import l from 'jac/logger/Logger';
import Client from 'Client';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class LocalClient extends Client{
    constructor(){
        super();

        this.id = null;
        this.name = null;
        this.color = null;

        this.geb = new GlobalEventBus();

        this.geb.addEventListener('clientConfirmed', ($evt) => {
            l.debug('Local Client Caught Connected: ', $evt.data);
            this.id = $evt.data.clientId;
            this.geb.dispatchEvent(new JacEvent('requestLocalClientName'));
        });

        this.geb.addEventListener('setLocalClientInfo', ($evt) => {
            l.debug('Caught Set Local Client Name: ', $evt.data);
            this.name = $evt.data.name;
            this.color = $evt.data.color;
        });

    }
}