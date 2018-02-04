import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import LocalClient from 'LocalClient';
import RemoteClient from 'RemoteClient';
import JacEvent from "./jac/events/JacEvent";

export default class ClientsManager extends EventDispatcher {
    constructor() {
        super();
        let self = this;
        this.geb = new GlobalEventBus();

        this.localClient = null;
        this.otherClients = [];

        //Delegates
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);
        this.localClientConfirmedDelegate = EventUtils.bind(self, self.handleLocalClientConfirmed);

        //Events
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
        this.geb.addEventListener('localClientConfirmed', this.localClientConfirmedDelegate);
    }

    handleLocalClientConfirmed($evt) {
        //Request sending of more info
        this.geb.dispatchEvent(new JacEvent('requestLocalClientInfo'));
    }

    handleLocalClientInfoSet($evt) {
        l.debug('Clients Manager Caught Local Client Info Set');
        let localClient = new LocalClient(
            $evt.data.data.clientId,
            $evt.data.data.clientName,
            $evt.data.data.clientColor
        );

        this.geb.dispatchEvent(new JacEvent('fullyConnected'));
    }

    handleRemoteClientInfoSet($evt) {
        l.debug('Clients Manager Caught Remote Client Info Set', $evt.data);
            let remoteClient = new RemoteClient(
                $evt.data.data.clientId,
                $evt.data.data.clientName,
                $evt.data.data.clientColor
            );

            this.otherClients.push(remoteClient);
    }

}