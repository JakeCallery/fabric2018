import l from 'jac/logger/Logger';
import JacEvent from 'jac/events/JacEvent';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from "./jac/events/EventDispatcher";

export default class InputDevice extends EventDispatcher {
    constructor() {
        super();

        const self = this;

        this.xPosList = [];
        this.yPosList = [];
        this.fieldValList = [];
    }

    clearPositions() {
        this.xPosList = [];
        this.yPosList = [];
        this.fieldValList = [];
    }

    update() {
        //OVERRIDE ME
    }
}