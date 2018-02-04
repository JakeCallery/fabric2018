import l from 'jac/logger/Logger';
import Client from 'Client';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class RemoteClient extends Client {
    constructor($id, $name, $color) {
        super($id, $name, $color);

        l.debug('New Remote Client: ', this.id, this.name, this.color);
    }
}
