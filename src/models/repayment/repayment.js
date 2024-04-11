class Repayment {
    constructor() {
        this._repayment_id = '';
        this._trans_id = '';
        this._debt_id = '';
    }

    get repayment_id() {
        return this._repayment_id;
    }

    set repayment_id(value) {
        this._repayment_id = value;
    }

    get trans_id() {
        return this._trans_id;
    }

    set trans_id(value) {
        this._trans_id = value;
    }

    get debt_id() {
        return this._debt_id;
    }

    set debt_id(value) {
        this._debt_id = value;
    }
}

export default Repayment;