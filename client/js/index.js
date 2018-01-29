//Lib Imports
import l from 'jac/logger/Logger';
import VerboseLevel from 'jac/logger/VerboseLevel';
import LogLevel from 'jac/logger/LogLevel';
import ConsoleTarget from 'jac/logger/ConsoleTarget';
import JacEvent from 'jac/events/JacEvent';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import WSManager from 'WSManager';
import DOMUtils from 'jac/utils/DOMUtils';
import BrowserUtils from 'jac/utils/BrowserUtils';


//Import through loaders
import '../css/normalize.css';
import '../css/main.css';

l.addLogTarget(new ConsoleTarget());
l.verboseFilter = (VerboseLevel.NORMAL | VerboseLevel.TIME | VerboseLevel.LEVEL);
l.levelFilter = (LogLevel.DEBUG | LogLevel.INFO | LogLevel.WARNING | LogLevel.ERROR);

/*
//Set Debugging Via URL Query
let urlParams = BrowserUtils.getURLParams(window);
if(urlParams.hasOwnProperty('debug') && urlParams.debug === 'true'){
    l.levelFilter = (LogLevel.DEBUG | LogLevel.INFO | LogLevel.WARNING | LogLevel.ERROR);
}
*/

l.debug('Here');

//Set up event buses
let geb = new GlobalEventBus();
//let uigeb = new UIGEB();
geb.addEventListener('wsOpened', ($evt) => {
    l.debug('Caught Websocket Connected');
    l.debug('Starting Ping');
    geb.dispatchEvent(new JacEvent('requestnewtopicdata'));
});

//Init
let wsManager = new WSManager();
wsManager.init();
