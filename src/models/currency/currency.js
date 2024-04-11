class Currency {
    constructor() {
        this._currency_id = '';
        this._currency_name = '';
        this._symbol = '';
    }

    get currency_id() {
        return this._currency_id;
    }

    set currency_id(value) {
        this._currency_id = value;
    }

    get currency_name() {
        return this._currency_name;
    }

    set currency_name(value) {
        this._currency_name = value;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(value) {
        this._symbol = value;
    }
}

export default Currency;
