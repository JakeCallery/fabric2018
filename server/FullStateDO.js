module.exports = class FullStateDO {
    constructor() {

        this.clientList = [];

    }

    get fullState() {
        let fullState = {};

        fullState.clientStates = [];

        for(let i = 0; i < this.clientList.length; i++) {
            fullState.clientStates.push(this.clientList[i].getState());
        }

        return fullState;

    }


};