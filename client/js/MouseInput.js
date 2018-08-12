import l from 'jac/logger/Logger';
import JacEvent from 'jac/events/JacEvent';
import EventUtils from 'jac/utils/EventUtils';
import InputDevice from "./InputDevice";

export default class MousuInput extends InputDevice {
    constructor($doc) {
        super();

        const self = this;
        this.doc = $doc;

        //Delegates
        this.mouseMoveDelegate = EventUtils.bind(self, self.handleMouseMove);

        //Events
        this.doc.addEventListener('mousemove', this.mouseMoveDelegate);

        //Local Mouse Locations
        this.mouseX = null;
        this.mouseY = null;
        this.mouseFieldValue = null;
    }

    update() {
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

}
