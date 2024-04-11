class BorrowerDebt {
    constructor() {
        this._borrower_debt_id = '';
        this._borrower_id = '';
        this._debt_id = '';
    }

    get borrower_debt_id() {
        return this._borrower_debt_id;
    }

    set borrower_debt_id(value) {
        this._borrower_debt_id = value;
    }

    get borrower_id() {
        return this._borrower_id;
    }

    set borrower_id(value) {
        this._borrower_id = value;
    }

    get debt_id() {
        return this._debt_id;
    }

    set debt_id(value) {
        this._debt_id = value;
    }
}

export default BorrowerDebt;