import { ExchangeRate } from '../../../models';

class ExchangeRateBuilder {
    constructor() {
        this.exchangeRate = new ExchangeRate();
    }

    setExchangeRateId(exchangeRateId) {
        this.exchangeRate.exchange_rate_id = exchangeRateId;
        return this;
    }

    setFromCurrencyId(fromCurrencyId) {
        this.exchangeRate.from_currency_id = fromCurrencyId;
        return this;
    }

    setToCurrencyId(toCurrencyId) {
        this.exchangeRate.to_currency_id = toCurrencyId;
        return this;
    }

    setRate(rate) {
        this.exchangeRate.rate = rate;
        return this;
    }

    setLastUpdated(lastUpdated) {
        this.exchangeRate.last_updated = lastUpdated;
        return this;
    }

    build() {
        return this.exchangeRate;
    }
}

export default ExchangeRateBuilder;
