class Wallet {
    constructor() {
        this._wallet_id = '';
        this._wallet_name = '';
        this._currency_id = '';
        this._balance = 0;
        this._account_id = '';
    }

    get wallet_id() {
        return this._wallet_id;
    }

    set wallet_id(value) {
        this._wallet_id = value;
    }

    get wallet_name() {
        return this._wallet_name;
    }

    set wallet_name(value) {
        this._wallet_name = value;
    }

    get currency_id() {
        return this._currency_id;
    }

    set currency_id(value) {
        this._currency_id = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get account_id() {
        return this._account_id;
    }

    set account_id(value) {
        this._account_id = value;
    }
}

export default Wallet;