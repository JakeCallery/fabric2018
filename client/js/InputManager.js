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

        this.localClient = null;

        //Local Mouse Locations
        this.mouseX = null;
        this.mouseY = null;
        this.mouseFieldValue = null;

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
        this.mouseMoveDelegate = EventUtils.bind(self, self.handleMouseMove);
        this.localClientInfoSetDelegate = EventUtils.bind(self, self.handleLocalClientInfoSet);

        //Events
        this.doc.addEventListener('mousemove', this.mouseMoveDelegate);
        this.geb.addEventListener('localClientInfoSet', this.localClientInfoSetDelegate);
    }

    update() {
        //TODO: Support Touch Events
        this.localClient.clearPositions();
        if(this.mouseX !== null){
            this.localClient.posXList.push(this.mouseX);
            this.localClient.posYList.push(this.mouseY);
            this.localClient.fieldValList.push(this.mouseFieldValue);
        }

    }

    handleMouseMove($evt) {
        if($evt.buttons === 1) {
            //LMB down
            this.mouseX = $evt.clientX;
            this.mouseY = $evt.clientY;
            this.mouseFieldValue = 20; //TODO: Update for real
        } else if($evt.buttons === 0){
            //clear
            this.mouseX = null;
            this.mouseY = null;
            this.mouseFieldValue = null;
        }
    }

    handleLocalClientInfoSet($evt) {
        this.localClient = this.clientsManager.localClient;
    }
}