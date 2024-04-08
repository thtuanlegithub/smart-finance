class ExchangeRate {
    constructor() {
        this.exchange_rate_id = '';
        this.from_currency_id = '';
        this.to_currency_id = '';
        this.rate = 0;
        this.last_updated = '';
    }

    set exchange_rate_id(value) {
        this.exchange_rate_id = value;
    }

    get exchange_rate_id() {
        return this.exchange_rate_id;
    }

    set from_currency_id(value) {
        this.from_currency_id = value;
    }

    get from_currency_id() {
        return this.from_currency_id;
    }

    set to_currency_id(value) {
        this.to_currency_id = value;
    }

    get to_currency_id() {
        return this.to_currency_id;
    }

    set rate(value) {
        this.rate = value;
    }

    get rate() {
        return this.rate;
    }

    set last_updated(value) {
        this.last_updated = value;
    }

    get last_updated() {
        return this.last_updated;
    }
}

export default ExchangeRate;