class Wallet {
    constructor() {
        this.wallet_id = '';
        this.wallet_name = '';
        this.currency_id = '';
        this.balance = 0;
        this.account_id = '';
    }

    set wallet_id(value) {
        this.wallet_id = value;
    }

    get wallet_id() {
        return this.wallet_id;
    }

    set wallet_name(value) {
        this.wallet_name = value;
    }

    get wallet_name() {
        return this.wallet_name;
    }

    set currency_id(value) {
        this.currency_id = value;
    }

    get currency_id() {
        return this.currency_id;
    }

    set balance(value) {
        this.balance = value;
    }

    get balance() {
        return this.balance;
    }

    set account_id(value) {
        this.account_id = value;
    }

    get account_id() {
        return this.account_id;
    }
}

export default Wallet;