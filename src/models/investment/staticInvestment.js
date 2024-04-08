class StaticInvestment {
    constructor() {
        this.static_investment_id = '';
        this.wallet_id = '';
        this.capital = 0;
        this.term = 0;
        this.interest_rate = 0;
        this.maturity_method = '';
        this.note = '';
    }

    get static_investment_id() {
        return this.static_investment_id;
    }

    set static_investment_id(value) {
        this.static_investment_id = value;
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

    get term() {
        return this.term;
    }

    set term(value) {
        this.term = value;
    }

    get interest_rate() {
        return this.interest_rate;
    }

    set interest_rate(value) {
        this.interest_rate = value;
    }

    get maturity_method() {
        return this.maturity_method;
    }

    set maturity_method(value) {
        this.maturity_method = value;
    }

    get note() {
        return this.note;
    }

    set note(value) {
        this.note = value;
    }
}

export default StaticInvestment;