class DebtCollection {
    constructor() {
        this._debt_collection_id = '';
        this._trans_id = '';
        this._loan_id = '';
    }

    get debt_collection_id() {
        return this._debt_collection_id;
    }

    set debt_collection_id(value) {
        this._debt_collection_id = value;
    }

    get trans_id() {
        return this._trans_id;
    }

    set trans_id(value) {
        this._trans_id = value;
    }

    get loan_id() {
        return this._loan_id;
    }

    set loan_id(value) {
        this._loan_id = value;
    }
}

export default DebtCollection;