import l from 'jac/logger/Logger';
import Client from './Client';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';

export default class LocalClient extends Client {
    constructor($id, $name, $color){
        super($id, $name, $color);

        this.geb = new GlobalEventBus();

        // this.geb.addEventListener('localClientConfirmed', ($evt) => {
        //     l.debug('Local Client Caught Connected: ', $evt.data);
        //     this.id = $evt.data;
        //     this.geb.dispatchEvent(new JacEvent('requestLocalClientInfo'));
        // });
        //
        // this.geb.addEventListener('localClientInfoSet', ($evt) => {
        //     l.debug('Local Client Caught Info Set: ', $evt.data);
        //     this.name = $evt.data.data.name;
        //     this.color = $evt.data.data.color;
        //
        //     l.debug('Full Local Client Info: ', this.id, this.name, this.color);
        // });

        l.debug('--- New Local Client ---');

    }
}