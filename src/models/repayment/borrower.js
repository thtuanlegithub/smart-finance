class Borrower {
    constructor() {
        this.borrower_id = '';
        this.borrower_name = '';
        this.borrower_phone = '';
    }

    get borrower_id() {
        return this.borrower_id;
    }

    set borrower_id(value) {
        this.borrower_id = value;
    }

    get borrower_name() {
        return this.borrower_name;
    }

    set borrower_name(value) {
        this.borrower_name = value;
    }

    get borrower_phone() {
        return this.borrower_phone;
    }

    set borrower_phone(value) {
        this.borrower_phone = value;
    }
}

export default Borrower;
