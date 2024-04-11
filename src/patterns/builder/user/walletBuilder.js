import { Wallet } from '../../../models';

class WalletBuilder {
    constructor() {
        this.wallet = new Wallet();
    }

    setWalletId(walletId) {
        this.wallet.wallet_id = walletId;
        return this;
    }

    setWalletName(walletName) {
        this.wallet.wallet_name = walletName;
        return this;
    }

    setCurrencyId(currencyId) {
        this.wallet.currency_id = currencyId;
        return this;
    }

    setBalance(balance) {
        this.wallet.balance = balance;
        return this;
    }

    setAccountId(accountId) {
        this.wallet.account_id = accountId;
        return this;
    }

    build() {
        return this.wallet;
    }
}

export default WalletBuilder;
