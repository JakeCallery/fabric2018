import l from 'jac/logger/Logger';
import EventDispatcher from 'jac/events/EventDispatcher';
let instance = null;

export default class State extends EventDispatcher {
    constructor() {
        super();

        if(instance){
           return instance;
        }

        //Local
        this.clientsManager = null;

        instance = this;

    }

    get state(){
        //Name, Color, X, Y, FieldVal

        let state = [];

        //Grab local Client Info
        let localClient = this.clientsManager.localClient;
        if(localClient) {
            for(let i = 0; i < localClient.posXList.length; i++){
                state.push(localClient.name);
                state.push(localClient.color);
                state.push(localClient.posXList[i]);
                state.push(localClient.posYList[i]);
                state.push(localClient.fieldValList[i]);
            }
        }

        //TODO Hook up remote clients

        return state;

    }

    setClientsManager($clientsManager) {
        this.clientsManager = $clientsManager
    }
}