import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import Stats from 'mrdoob/Stats';

export default class MainLoopManager extends EventDispatcher {
    constructor($window, $inputManager, $drawManager, $isRunning) {
        super();

        let self = this;
        this.geb = new GlobalEventBus();
        this.window = $window;

        this.stats = new Stats();
        this.stats.showPanel(1);
        this.window.document.body.appendChild(this.stats.dom);

        this.reqAnimFrameId = null;
        this.lastStepStartTime = null;
        this.lastStepEndTime = null;

        this.isRunning = ($isRunning === true)?true:false;

        this.im = $inputManager;
        this.dm = $drawManager;

        //Delegates
        this.requestPauseDelegate = EventUtils.bind(self, self.handleRequestPause);
        this.requestPlayDelegate = EventUtils.bind(self, self.handleRequestPlay);
        this.requestManualStepDelegate = EventUtils.bind(self, self.handleRequestManualStep);
        this.runDelegate = EventUtils.bind(self, self.run);

        //Events
        this.geb.addEventListener('requestPause', this.requestPauseDelegate);
        this.geb.addEventListener('requestPlay', this.requestPlayDelegate);
        this.geb.addEventListener('requestManualStep', this.requestManualStepDelegate);
    }

    run() {
        let self = this;
        if(this.isRunning) {
            self.reqAnimFramId = window.requestAnimationFrame(this.runDelegate);
        }

        this.stats.begin();
        self.step();
        this.stats.end();
    }

    pause() {
        l.debug('Pausing...');
        this.isRunning = false;
        if(this.reqAnimFrameId !== null){
            this.window.cancelAnimationFrame(this.reqAnimFrameId);
        }
    }

    play() {
        let self = this;
        self.isRunning = true;
        l.debug('Playing...');
        self.run();
    }

    step() {
        //l.debug('Step...');
        this.lastStepStartTime = window.performance.now();
        this.dm.draw();
        this.lastStepEndTime = window.performance.now();

    }

    handleRequestManualStep($evt) {
        l.debug('Caught Request Manual Step...');
        this.isRunning = false;
        this.step();
    }

    handleRequestPause($evt) {
        l.debug('Caught Request Pause');
        this.pause();
    }

    handleRequestPlay($evt) {
        l.debug('Caught Request Play');
        this.play();
    }
}