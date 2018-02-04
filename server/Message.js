module.exports = class Message {
    constructor($msgAction, $data) {

        this.content = {
            action: $msgAction,
            clientId: null, //will be set by "sendMessage" on the client
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