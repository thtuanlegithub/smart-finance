class Borrower {
    constructor() {
        this._borrower_id = '';
        this._borrower_name = '';
        this._borrower_phone = '';
    }

    get borrower_id() {
        return this._borrower_id;
    }

    set borrower_id(value) {
        this._borrower_id = value;
    }

    get borrower_name() {
        return this._borrower_name;
    }

    set borrower_name(value) {
        this._borrower_name = value;
    }

    get borrower_phone() {
        return this._borrower_phone;
    }

    set borrower_phone(value) {
        this._borrower_phone = value;
    }
}

export default Borrower;
