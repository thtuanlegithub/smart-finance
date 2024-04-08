class BorrowerDebt {
    constructor() {
        this.borrower_debt_id = '';
        this.borrower_id = '';
        this.debt_id = '';
    }

    get borrower_debt_id() {
        return this.borrower_debt_id;
    }

    set borrower_debt_id(value) {
        this.borrower_debt_id = value;
    }

    get borrower_id() {
        return this.borrower_id;
    }

    set borrower_id(value) {
        this.borrower_id = value;
    }

    get debt_id() {
        return this.debt_id;
    }

    set debt_id(value) {
        this.debt_id = value;
    }
}

export default BorrowerDebt;