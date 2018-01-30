import l from 'jac/logger/Logger';

export default class Message {
    constructor($action, $data){
        this.content = {
            action: $action,
            data: $data
        };
    }

    serialize(){
        return JSON.stringify(this.content);
    }

    get action(){
        return this.content.action;
    }

    get data(){
        return this.content.data;
    }
}