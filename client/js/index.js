//Lib Imports
import l from 'jac/logger/Logger';
import VerboseLevel from 'jac/logger/VerboseLevel';
import LogLevel from 'jac/logger/LogLevel';
import ConsoleTarget from 'jac/logger/ConsoleTarget';
import GlobalEventBus from 'jac/events/GlobalEventBus';
import WSManager from 'WSManager';
import BrowserUtils from 'jac/utils/BrowserUtils';
import UIManager from 'UIManager';
import RequestManager from 'RequestManager';
import LocalClient from 'LocalClient';
import ClientsManager from 'ClientsManager';

//Import through loaders
import '../css/normalize.css';
import '../css/main.css';
import DrawManager from 'DrawManager';
import MainLoopManager from 'MainLoopManager';
import InputManager from 'InputManager';
import State from 'State';

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

//Set up event buses
let geb = new GlobalEventBus();

geb.addEventListener('wsOpened', ($evt) => {
    l.debug('Caught Websocket Connected');
    l.debug('Starting Ping');
});

//Init
let clientsManager = new ClientsManager();
let wsManager = new WSManager();

let uiManager = new UIManager(document);

let state = new State();
state.setClientsManager(clientsManager);
let inputManager = new InputManager(window, clientsManager);
let drawManager = new DrawManager(window);
let mainLoopManager = new MainLoopManager(window, inputManager, drawManager);
//let requestManager = new RequestManager();