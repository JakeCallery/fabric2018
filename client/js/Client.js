import l from 'jac/logger/Logger';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class LocalClient extends EventDispatcher{
    constructor($id, $name, $color){
        super();
        this.geb = new GlobalEventBus();

        this.id = $id;
        this.name = $name;
        this.color = $color;
    }
}