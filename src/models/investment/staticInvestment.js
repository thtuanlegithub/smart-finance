class StaticInvestment {
    constructor() {
        this._static_investment_id = '';
        this._wallet_id = '';
        this._capital = 0;
        this._term = 0;
        this._interest_rate = 0;
        this._maturity_method = '';
        this._note = '';
    }

    get static_investment_id() {
        return this._static_investment_id;
    }

    set static_investment_id(value) {
        this._static_investment_id = value;
    }

    get wallet_id() {
        return this._wallet_id;
    }

    set wallet_id(value) {
        this._wallet_id = value;
    }

    get capital() {
        return this._capital;
    }

    set capital(value) {
        this._capital = value;
    }

    get term() {
        return this._term;
    }

    set term(value) {
        this._term = value;
    }

    get interest_rate() {
        return this._interest_rate;
    }

    set interest_rate(value) {
        this._interest_rate = value;
    }

    get maturity_method() {
        return this._maturity_method;
    }

    set maturity_method(value) {
        this._maturity_method = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }
}

export default StaticInvestment;