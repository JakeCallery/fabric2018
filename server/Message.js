module.exports = class Message {
    constructor($msgAction, $data) {

        this.content = {
            action: $msgAction,
            myClientId: null, //will be set by "sendMessage" on the client
            data: $data
        };
    }

    serialize() {
        return JSON.stringify(this.content);
    }

    get data() {
        return this.content.data;
    }

    get action() {
        return this.content.action;
    }
};