import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import JacEvent from 'jac/events/JacEvent';
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

        this.isRunning = ($isRunning === true);

        this.im = $inputManager;
        this.dm = $drawManager;

        //Delegates
        this.requestPauseDelegate = EventUtils.bind(self, self.handleRequestPause);
        this.requestPlayDelegate = EventUtils.bind(self, self.handleRequestPlay);
        this.requestManualStepDelegate = EventUtils.bind(self, self.handleRequestManualStep);
        this.runDelegate = EventUtils.bind(self, self.drawRun);

        //Events
        this.geb.addEventListener('requestPause', this.requestPauseDelegate);
        this.geb.addEventListener('requestPlay', this.requestPlayDelegate);
        this.geb.addEventListener('requestManualStep', this.requestManualStepDelegate);
    }

    drawRun() {
        let self = this;
        if(this.isRunning) {
            self.reqAnimFrameId = window.requestAnimationFrame(this.runDelegate);
        }

        this.stats.begin();
        self.localInputStep();
        self.drawStep();
        self.notifyServerStep();
        this.stats.end();
    }

    drawPause() {
        l.debug('Pausing...');
        this.isRunning = false;
        if(this.reqAnimFrameId !== null){
            this.window.cancelAnimationFrame(this.reqAnimFrameId);
        }
    }

    drawPlay() {
        let self = this;
        self.isRunning = true;
        l.debug('Playing...');
        self.drawRun();
    }

    localInputStep() {
        this.im.update();
    }

    drawStep() {
        //l.debug('Step...');
        this.lastStepStartTime = window.performance.now();

        this.dm.draw();

        this.lastStepEndTime = window.performance.now();

    }

    notifyServerStep() {
        this.geb.dispatchEvent(new JacEvent('updateServer'));
    }

    handleRequestManualStep($evt) {
        l.debug('Caught Request Manual Step...');
        this.isRunning = false;
        this.drawStep();
    }

    handleRequestPause($evt) {
        l.debug('Caught Request Pause');
        this.drawPause();
    }

    handleRequestPlay($evt) {
        l.debug('Caught Request Play');
        this.drawPlay();
    }
}