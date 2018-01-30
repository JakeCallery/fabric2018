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
        this.requestSetNameDelegate = EventUtils.bind(self, self.handleRequestSetName);

        //Events
        this.geb.addEventListener('requestSetName', this.requestSetNameDelegate);
    }

    handleRequestSetName($evt) {
        l.debug('Caught Request Set Name: ', $evt.data);
        this.geb.dispatchEvent(new JacEvent('requestSetName', $evt.data));
    }



}