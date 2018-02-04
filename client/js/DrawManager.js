import l from 'jac/logger/Logger';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import State from 'State';

export default class DrawManager extends EventDispatcher {
    constructor($window) {
        super();
        this.window = $window;
        this.doc = $window.document;
        this.geb = new GlobalEventBus();
        this.state = new State();
        this.circleEndAngle = 2 * Math.PI;

        //Wait for the DOM to be ready
        this.doc.addEventListener('DOMContentLoaded', () => {
            this.init();
        })
    }

    init() {
        let self = this;

        //DOM
        this.playAreaCanvas = this.doc.getElementById('playAreaCanvas');
        this.ctx = this.playAreaCanvas.getContext('2d');
        this.canvasRect = this.playAreaCanvas.getBoundingClientRect();

        l.debug('Draw Manager Ready');
    }

    draw() {
        //l.debug('Drawing....');
        //Clear Canvas
        this.ctx.clearRect(0,0,1024,768);

        //Grab State
        this.lastDrawStartTime = this.window.performance.now();
        let fullState = this.state.state;

        //Loop over all items
        let stateInfoLength = fullState.length;
        for(let i = 0; i < stateInfoLength; i+=5){ //Name, Color, X, Y, FieldVal
            let name = fullState[i+0];
            let color = fullState[i+1];
            let x = fullState[i+2] - this.canvasRect.left;
            let y = fullState[i+3] - this.canvasRect.top;
            let fieldValue = fullState[i+4];

            //Set Color
            this.ctx.fillStyle = color;

            //Draw Circle
            this.ctx.beginPath();
            this.ctx.arc(x, y, fieldValue, 0, this.circleEndAngle);
            this.ctx.closePath();
            this.ctx.fill();

        }

        this.lastDrawEndTime = this.window.performance.now();
    }

}