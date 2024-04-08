class Transaction {
    constructor() {
        this.trans_id = '';
        this.category_id = '';
        this.amount = 0;
        this.note = '';
        this.created_at = '';
        this.wallet_id = '';
    }

    get trans_id() {
        return this.trans_id;
    }

    set trans_id(value) {
        this.trans_id = value;
    }

    get category_id() {
        return this.category_id;
    }

    set category_id(value) {
        this.category_id = value;
    }

    get amount() {
        return this.amount;
    }

    set amount(value) {
        this.amount = value;
    }

    get note() {
        return this.note;
    }

    set note(value) {
        this.note = value;
    }

    get created_at() {
        return this.created_at;
    }

    set created_at(value) {
        this.created_at = value;
    }

    get wallet_id() {
        return this.wallet_id;
    }

    set wallet_id(value) {
        this.wallet_id = value;
    }
}

export default Transaction;
