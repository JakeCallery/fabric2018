import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import LocalClient from 'LocalClient';

export default class ClientsManager extends EventDispatcher {
    constructor() {
        super();
        let self = this;
        this.geb = new GlobalEventBus();

        this.localClient = new LocalClient();
        this.otherClients = [];

        //Delegates
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);
        this.localClientConfirmedDelegate = EventUtils.bind(self, self.handleLocalClientConfirmed);

        //Events
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
        this.geb.addEventListener('localClientConfirmed', this.localClientConfirmedDelegate);
    }

    handleLocalClientInfoSet($evt) {
        l.debug('Clients Manager Caught Local Client Info Set');
    }

    handleLocalClientConfirmed($evt) {
        l.debug('Clients Manager caught local client confirmed: ', this.localClient.id);

    }

}