import l from 'jac/logger/Logger';
import Client from 'Client';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';
import EventUtils from 'jac/utils/EventUtils';
import Message from 'Message';
import ArrayUtils from 'jac/utils/ArrayUtils';

export default class LocalClient extends Client {
    constructor($id, $name, $color){
        super($id, $name, $color);

        const self = this;
        this.geb = new GlobalEventBus();

        //Delegates
        this.updateServerDelegate = EventUtils.bind(self, self.handleUpdateServer);

        //Events
        this.geb.addEventListener('updateServer', this.updateServerDelegate);

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

    handleUpdateServer($evt) {
        //TODO: ArrayUtils.flatten() may be too slow, refactor so as to not use multidimentional arrays
        this.geb.dispatchEvent(new JacEvent('messageToServer', new Message('localClientUpdate', {
            name: this.name,
            color: this.color,
            id: this.id,
            x: ArrayUtils.flatten(this.xPosList),
            y: ArrayUtils.flatten(this.yPosList),
            fieldVal: ArrayUtils.flatten(this.fieldValList)
        })));
    }
}