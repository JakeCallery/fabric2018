import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';

export default class InputManager extends EventDispatcher {
    constructor($window, $clientsManager){
        super();

        this.window = $window;
        this.doc = $window.document;
        this.geb = new GlobalEventBus();
        this.clientsManager = $clientsManager;
        this.devices = [];
        this.localClient = null;

        //Wait for the DOM to be ready
        this.doc.addEventListener('DOMContentLoaded', () => {
            this.init();
        })
    }

    init() {
        l.debug('InputManager ready');

        let self = this;

        //DOM
        this.playAreaCanvas = this.doc.getElementById('playAreaCanvas');

        //Delegates
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);

        //Events
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
    }

    addInputDevice($inputDevice) {
        this.devices.push($inputDevice);

    }

    //TODO: NYI
    removeInputDevice($inputDevice) {

    }

    update() {
        this.localClient.clearPositions();

        for(let i = 0; i < this.devices.length; i++) {
            let device = this.devices[i];
            device.update();
            this.localClient.posXList.push(device.xPosList);
            this.localClient.posYList.push(device.yPosList);
            this.localClient.fieldValList.push(device.fieldValList);
        }

    }

    handleLocalClientInfoSet($evt) {
        this.localClient = this.clientsManager.localClient;
    }
}