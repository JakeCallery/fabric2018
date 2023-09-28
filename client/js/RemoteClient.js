import l from 'jac/logger/Logger';
import Client from 'Client';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';
import EventUtils from "./jac/utils/EventUtils";

export default class RemoteClient extends Client {
    constructor($id, $name, $color) {
        super($id, $name, $color);

        const self = this;
        this.geb = new GlobalEventBus();

        //Delegates
        this.remoteClientUpdateDelegate = EventUtils.bind(self, self.handleRemoteClientUpdate);

        //Events
        this.geb.addEventListener('remoteClientUpdate', this.remoteClientUpdateDelegate);

        l.debug('New Remote Client: ', this.id, this.name, this.color);
    }

    handleRemoteClientUpdate($evt) {
        l.debug('*********************Data: ', $evt.data);
    }
}
