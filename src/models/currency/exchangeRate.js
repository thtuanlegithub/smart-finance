class ExchangeRate {
    constructor() {
        this._exchange_rate_id = '';
        this._from_currency_id = '';
        this._to_currency_id = '';
        this._rate = 0;
        this._last_updated = '';
    }

    get exchange_rate_id() {
        return this._exchange_rate_id;
    }

    set exchange_rate_id(value) {
        this._exchange_rate_id = value;
    }

    get from_currency_id() {
        return this._from_currency_id;
    }

    set from_currency_id(value) {
        this._from_currency_id = value;
    }

    get to_currency_id() {
        return this._to_currency_id;
    }

    set to_currency_id(value) {
        this._to_currency_id = value;
    }

    get rate() {
        return this._rate;
    }

    set rate(value) {
        this._rate = value;
    }

    get last_updated() {
        return this._last_updated;
    }

    set last_updated(value) {
        this._last_updated = value;
    }
}

export default ExchangeRate;