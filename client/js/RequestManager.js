import l from 'jac/logger/Logger';
import DOMUtils from 'jac/utils/DOMUtils';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';
import UIGEB from "./general/UIGEB";

export default class RequestManager extends EventDispatcher {
    constructor() {
        super();

        let self = this;
        this.geb = new GlobalEventBus();
        this.uigeb = new UIGEB();

        //Delegates
        this.requestConnectDelegate = EventUtils.bind(self, self.handleRequestConnect);

        //Events
        this.uigeb.addEventListener('requestConnect', this.requestConnectDelegate);

    }

    handleRequestConnect($evt) {
        l.debug('Caught Request Connect');

        this.geb.dispatchEvent(new JacEvent('requestConnect'));

        this.uigeb.completeUIEvent($evt.id, true);

    }



}