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
        this.requestSetInfoDelegate = EventUtils.bind(self, self.handleRequestSetInfo);
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);

        //Events
        this.geb.addEventListener('requestSetInfo', this.requestSetInfoDelegate);
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
    }

    handleLocalClientInfoSet($evt) {
        l.debug('Caught local Client info set: ', $evt.data);
        this.geb.dispatchEvent(new JacEvent('fullyConnected'));
    }

    handleRequestSetInfo($evt) {
        l.debug('Caught Request Set Info: ', $evt.data);
        this.geb.dispatchEvent(new JacEvent('requestSetInfo', $evt.data));
    }



}