class Transaction {
    constructor() {
        this._trans_id = '';
        this._category_id = '';
        this._amount = 0;
        this._note = '';
        this._created_at = '';
        this._wallet_id = '';
    }

    get trans_id() {
        return this._trans_id;
    }

    set trans_id(value) {
        this._trans_id = value;
    }

    get category_id() {
        return this._category_id;
    }

    set category_id(value) {
        this._category_id = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }

    get created_at() {
        return this._created_at;
    }

    set created_at(value) {
        this._created_at = value;
    }

    get wallet_id() {
        return this._wallet_id;
    }

    set wallet_id(value) {
        this._wallet_id = value;
    }
}

export default Transaction;
