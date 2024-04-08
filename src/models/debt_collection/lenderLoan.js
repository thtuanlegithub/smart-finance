class LenderLoan {
    constructor() {
        this.lender_loan_id = '';
        this.lender_id = '';
        this.loan_id = '';
    }

    get lender_loan_id() {
        return this.lender_loan_id;
    }

    set lender_loan_id(value) {
        this.lender_loan_id = value;
    }

    get lender_id() {
        return this.lender_id;
    }

    set lender_id(value) {
        this.lender_id = value;
    }

    get loan_id() {
        return this.loan_id;
    }

    set loan_id(value) {
        this.loan_id = value;
    }
}

export default LenderLoan;  