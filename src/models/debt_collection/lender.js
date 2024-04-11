class Lender {
    constructor() {
        this._lender_id = '';
        this._lender_name = '';
        this._lender_phone = '';
    }

    get lender_id() {
        return this._lender_id;
    }

    set lender_id(value) {
        this._lender_id = value;
    }

    get lender_name() {
        return this._lender_name;
    }

    set lender_name(value) {
        this._lender_name = value;
    }

    get lender_phone() {
        return this._lender_phone;
    }

    set lender_phone(value) {
        this._lender_phone = value;
    }
}

export default Lender;