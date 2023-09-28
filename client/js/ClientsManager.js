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
        this.remoteClients = [];

        //Delegates
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);
        this.localClientConfirmedDelegate = EventUtils.bind(self, self.handleLocalClientConfirmed);
        this.remoteClientInfoSetDelegate = EventUtils.bind(self, self.handleRemoteClientInfoSet);
        this.remoteClientDroppedDelegate = EventUtils.bind(self, self.handleRemoteClientDropped);
        this.fullStateUpdateDelegate = EventUtils.bind(self, self.handleFullStateUpdate);

        //Events
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
        this.geb.addEventListener('localClientConfirmed', this.localClientConfirmedDelegate);
        this.geb.addEventListener('remoteClientInfoSet', this.remoteClientInfoSetDelegate);
        this.geb.addEventListener('remoteClientDropped', this.remoteClientDroppedDelegate);
        this.geb.addEventListener('fullStateUpdate', this.fullStateUpdateDelegate);
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

        this.remoteClients.push(remoteClient);
        l.debug('Remote Clients List Length: ', this.remoteClients.length);
    }

    handleFullStateUpdate($evt) {
        let localClientId = this.localClient.id;

        //TODO: START HERE
        //Loop Through each obj in full state data (in $evt.data.data I think)
        //If that remote client id doesn't exist in local list, create new remote client
        //Update all remote clients to position and field value

    }

    handleRemoteClientDropped($evt) {
        l.debug('Caught Remote Client Dropped: ', $evt.data);
        let droppedId = $evt.data;
        let removedClient = null;

        for(let i = 0; i < this.remoteClients.length; i++){
            if(this.remoteClients[i].id === droppedId){
                removedClient = this.remoteClients.splice(i,1)[0];
                l.debug('Removed Remote Dropped client: ', removedClient.id);
                break;
            }
        }

        l.debug('Remote Clients List Length: ', this.remoteClients.length);

    }

}