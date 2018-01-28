const ShortId = require('shortid');

exports.Client = class {
    constructor($connection) {
        this.connection = $connection;
        this.id = ShortId.generate();

    }
};


