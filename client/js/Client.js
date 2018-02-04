import l from 'jac/logger/Logger';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class Client extends EventDispatcher{
    constructor($id, $name, $color) {
        super();
        this.id = $id;
        this.name = $name;
        this.color = $color;

        this.posXList = [];
        this.posYList= [];
        this.fieldValList = [];

        l.debug('** New Client: ', $id, $name, $color);
    }

    clearPositions(){
        this.posXList = [];
        this.posYList = [];
        this.fieldValList = [];
    }
}