class Currency {
    constructor() {
        this.currency_id = '';
        this.currency_name = '';
        this.symbol = '';
    }

    get currency_id() {
        return this.currency_id;
    }

    set currency_id(value) {
        this.currency_id = value;
    }

    get currency_name() {
        return this.currency_name;
    }

    set currency_name(value) {
        this.currency_name = value;
    }

    get symbol() {
        return this.symbol;
    }

    set symbol(value) {
        this.symbol = value;
    }
}

export default Currency;
