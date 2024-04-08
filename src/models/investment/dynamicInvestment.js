class DynamicInvestment {
    constructor() {
        this.dynamic_investment_id = '';
        this.wallet_id = '';
        this.capital = 0;
        this.maturity_date = '';
        this.result = 0;
        this.note = '';
    }

    get dynamic_investment_id() {
        return this.dynamic_investment_id;
    }

    set dynamic_investment_id(value) {
        this.dynamic_investment_id = value;
    }

    get wallet_id() {
        return this.wallet_id;
    }

    set wallet_id(value) {
        this.wallet_id = value;
    }

    get capital() {
        return this.capital;
    }

    set capital(value) {
        this.capital = value;
    }

    get maturity_date() {
        return this.maturity_date;
    }

    set maturity_date(value) {
        this.maturity_date = value;
    }

    get result() {
        return this.result;
    }

    set result(value) {
        this.result = value;
    }

    get note() {
        return this.note;
    }

    set note(value) {
        this.note = value;
    }
}

export default DynamicInvestment;