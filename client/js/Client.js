import l from 'jac/logger/Logger';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class LocalClient extends EventDispatcher{
    constructor(){
        super();
        this.name = null;
        this.id = null;

        this.geb = new GlobalEventBus();
    }
}