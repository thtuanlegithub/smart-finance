class LenderLoan {
    constructor() {
        this._lender_loan_id = '';
        this._lender_id = '';
        this._loan_id = '';
    }

    get lender_loan_id() {
        return this._lender_loan_id;
    }

    set lender_loan_id(value) {
        this._lender_loan_id = value;
    }

    get lender_id() {
        return this._lender_id;
    }

    set lender_id(value) {
        this._lender_id = value;
    }

    get loan_id() {
        return this._loan_id;
    }

    set loan_id(value) {
        this._loan_id = value;
    }
}

export default LenderLoan;