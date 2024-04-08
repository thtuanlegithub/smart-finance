class Lender {
    constructor() {
        this.lender_id = '';
        this.lender_name = '';
        this.lender_phone = '';
    }

    get lender_id() {
        return this.lender_id;
    }

    set lender_id(value) {
        this.lender_id = value;
    }

    get lender_name() {
        return this.lender_name;
    }

    set lender_name(value) {
        this.lender_name = value;
    }

    get lender_phone() {
        return this.lender_phone;
    }

    set lender_phone(value) {
        this.lender_phone = value;
    }
}

export default Lender;