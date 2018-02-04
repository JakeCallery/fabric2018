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
        this.remoteClientInfoSetDelegate = EventUtils.bind(self, self.handleRemoteClientInfoSet);
        this.remoteClientDroppedDelegate = EventUtils.bind(self, self.handleRemoteClientDropped);

        //Events
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
        this.geb.addEventListener('localClientConfirmed', this.localClientConfirmedDelegate);
        this.geb.addEventListener('remoteClientInfoSet', this.remoteClientInfoSetDelegate);
        this.geb.addEventListener('remoteClientDropped', this.remoteClientDroppedDelegate);
    }

    handleLocalClientConfirmed($evt) {
        //Request sending of more info
        this.geb.dispatchEvent(new JacEvent('requestLocalClientInfo'));
    }

    handleLocalClientInfoSet($evt) {
        l.debug('Clients Manager Caught Local Client Info Set');
        this.localClient= new LocalClient(
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
        l.debug('Other Clients List Length: ', this.otherClients.length);
    }

    handleRemoteClientDropped($evt) {
        l.debug('Caught Remote Client Dropped: ', $evt.data);
        let droppedId = $evt.data;
        let removedClient = null;

        for(let i = 0; i < this.otherClients.length; i++){
            if(this.otherClients[i].id === droppedId){
                removedClient = this.otherClients.splice(i,1)[0];
                l.debug('Removed Remote Dropped client: ', removedClient.id);
                break;
            }
        }

        l.debug('Other Clients List Length: ', this.otherClients.length);

    }

}