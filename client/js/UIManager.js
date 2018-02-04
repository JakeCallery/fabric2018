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
        this.drawButton = this.doc.getElementById('drawButton');

        //Delegates
        this.connectButtonClickDelegate = EventUtils.bind(self, self.handleConnectButtonClick);
        this.handleRequestLocalClientInfoDelegate = EventUtils.bind(self, self.handleRequestLocalClientInfo);
        this.handleFullyConnectedDelegate = EventUtils.bind(self, self.handleFullyConnected);
        this.drawButtonClickDelegate = EventUtils.bind(self, self.handleDrawButtonClick);

        //Events
        this.connectButton.addEventListener('click', this.connectButtonClickDelegate);
        this.drawButton.addEventListener('click', this.drawButtonClickDelegate);
        this.geb.addEventListener('requestLocalClientInfo', this.handleRequestLocalClientInfoDelegate);
        this.geb.addEventListener('fullyConnected', this.handleFullyConnectedDelegate);

    }

    handleRequestLocalClientInfo($evt){
        l.debug('Caught Request Local Client Name');
        this.geb.dispatchEvent(new JacEvent('setLocalClientInfo',
            {
                name: this.nameField.value,
                //source for random color generation: https://www.paulirish.com/2009/random-hex-color-code-snippets/
                color: '#'+(Math.random()*(1<<24)|0).toString(16) //TODO: Make a color picker
            }
        ));
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

    handleDrawButtonClick($evt) {
        l.debug('Caught Draw Button Click');
        this.geb.dispatchEvent(new JacEvent('requestManualDraw'));
    }
}