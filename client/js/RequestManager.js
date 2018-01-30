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
        this.nameSetDelegate = EventUtils.bind(self, self.handleNameSet);

        //Events
        this.geb.addEventListener('requestSetName', this.requestSetNameDelegate);
        this.geb.addEventListener('nameSet', this.nameSetDelegate);
    }

    handleNameSet($evt) {
        l.debug('Caught name Set: ', $evt.data);
        this.geb.dispatchEvent(new JacEvent('fullyConnected'));
    }

    handleRequestSetName($evt) {
        l.debug('Caught Request Set Name: ', $evt.data);
        this.geb.dispatchEvent(new JacEvent('requestSetName', $evt.data));
    }



}