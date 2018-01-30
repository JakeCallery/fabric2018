module.exports = class Message {
    constructor($msgAction, $data) {

        this.content = {
            action: $msgAction,
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