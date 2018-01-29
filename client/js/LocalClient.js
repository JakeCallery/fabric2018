import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class LocalClient extends EventDispatcher{
    constructor(){
        super();
        this.myName = null;
        this.myClientId = null;

        this.geb = new GlobalEventBus();

        this.geb.addEventListener('connected', ($evt) => {
            l.debug('Local Client Caught Connected: ', $evt.data);
            this.myName = $evt.data.name;
            this.myClientId = $evt.data.clientId;
        });

    }
}