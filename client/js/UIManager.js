import l from 'jac/logger/Logger';
import DOMUtils from 'jac/utils/DOMUtils';
import EventUtils from 'jac/utils/EventUtils';
import EventDispatcher from 'jac/events/EventDispatcher';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import JacEvent from 'jac/events/JacEvent';
import UIGEB from 'general/UIGEB';
import StringUtils from 'jac/utils/StringUtils';

export default class UIManager extends EventDispatcher {
    constructor($doc) {
        super();

        this.geb = new GlobalEventBus();
        this.uigeb = new UIGEB();
        this.doc = $doc;

        //Wait for the DOM to be ready
        this.doc.addEventListener('DOMContentLoaded', () => {
            this.init();
        })

    }

    init() {
        l.debug('DOM Ready');
        let self = this;

        //Elements
        this.connectButton = this.doc.getElementById('connectButton');
        this.nameField = this.doc.getElementById('nameField');

        //Delegates
        this.connectButtonClickDelegate = EventUtils.bind(self, self.handleConnectButtonClick);
        this.handleRequestLocalClientNameDelegate = EventUtils.bind(self, self.handleRequestLocalClientName);
        this.handleFullyConnectedDelegate = EventUtils.bind(self, self.handleFullyConnected);

        //Events
        this.connectButton.addEventListener('click', this.connectButtonClickDelegate);
        this.geb.addEventListener('requestLocalClientName', this.handleRequestLocalClientNameDelegate);
        this.geb.addEventListener('fullyConnected', this.handleFullyConnectedDelegate);
    }

    handleRequestLocalClientName($evt){
        l.debug('Caught Request Local Client Name');
        this.geb.dispatchEvent(new JacEvent('setLocalClientName', this.nameField.value));
    }

    handleConnectButtonClick($evt) {
        l.debug('Connect Click');
        let nameValue = this.nameField.value;
        l.debug('Name: ', nameValue);
        if(StringUtils.stripWhiteSpace(nameValue) !== ''){
            this.nameField.disabled = true;
            $evt.target.disabled = true;
            l.debug('Button Value: ', $evt.target.textContent);
            $evt.target.textContent = 'Connecting...';

            this.geb.dispatchEvent(new JacEvent('requestConnect'));

        } else {
            l.warn('Name field is empty, please enter name first.');
        }

    }

    handleFullyConnected($evt) {
        l.debug('Caught Fully Connected');
        this.connectButton.textContent = 'Connected';
    }
}