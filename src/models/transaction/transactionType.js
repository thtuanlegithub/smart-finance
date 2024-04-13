class TransactionType {
    constructor() {
        this._trans_type_id = '';
        this._trans_type_name = '';
    }

    get trans_type_id() {
        return this._trans_type_id;
    }

    set trans_type_id(value) {
        this._trans_type_id = value;
    }

    get trans_type_name() {
        return this._trans_type_name;
    }

    set trans_type_name(value) {
        this._trans_type_name = value;
    }
}

export default TransactionType;