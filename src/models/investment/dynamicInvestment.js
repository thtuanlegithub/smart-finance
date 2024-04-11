class DynamicInvestment {
    constructor() {
        this._dynamic_investment_id = '';
        this._wallet_id = '';
        this._capital = 0;
        this._maturity_date = '';
        this._result = 0;
        this._note = '';
    }

    get dynamic_investment_id() {
        return this._dynamic_investment_id;
    }

    set dynamic_investment_id(value) {
        this._dynamic_investment_id = value;
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

    get maturity_date() {
        return this._maturity_date;
    }

    set maturity_date(value) {
        this._maturity_date = value;
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }
}

export default DynamicInvestment;