import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';

export default class DrawManager extends EventDispatcher {
    constructor($doc) {
        super();
        this.doc = $doc;
        this.geb = new GlobalEventBus();

        //Wait for the DOM to be ready
        this.doc.addEventListener('DOMContentLoaded', () => {
            this.init();
        })
    }

    init() {
        this.playAreaCanvas = this.doc.getElementById('playAreaCanvas');
        let self = this;

        //Delegates
        this.requestManualDrawDelegate = EventUtils.bind(self, self.handleManualDraw);

        //Events
        this.geb.addEventListener('requestManualDraw', this.requestManualDrawDelegate);

        l.debug('Draw Manager Ready');
    }

    draw() {
        l.debug('Draw Called');
    }

    handleManualDraw($evt) {
        l.debug('Caught Request Manual Draw');
        this.draw();
    }
}