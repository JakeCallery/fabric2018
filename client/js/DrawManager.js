import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';

export default class DrawManager extends EventDispatcher {
    constructor($window) {
        super();
        this.window = $window;
        this.doc = $window.document;
        this.geb = new GlobalEventBus();
        this.rafId = null;

        //Wait for the DOM to be ready
        this.doc.addEventListener('DOMContentLoaded', () => {
            this.init();
        })
    }

    init() {
        this.playAreaCanvas = this.doc.getElementById('playAreaCanvas');
        let self = this;

        l.debug('Draw Manager Ready');
    }

    draw() {
        l.debug('Drawing....');
        this.lastDrawStartTime = this.window.performance.now();
        this.lastDrawEndTime = this.window.performance.now();
    }

}