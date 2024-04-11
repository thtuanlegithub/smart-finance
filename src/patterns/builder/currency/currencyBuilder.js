import { Currency } from '../../../models';

class CurrencyBuilder {
    constructor() {
        this.currency = new Currency();
    }

    setCurrencyId(currencyId) {
        this.currency.currency_id = currencyId;
        return this;
    }

    setCurrencyName(currencyName) {
        this.currency.currency_name = currencyName;
        return this;
    }

    setSymbol(symbol) {
        this.currency.symbol = symbol;
        return this;
    }

    build() {
        return this.currency;
    }
}

export default CurrencyBuilder;

