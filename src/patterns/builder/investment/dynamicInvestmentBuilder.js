import { DynamicInvestment } from '../../../models';

class DynamicInvestmentBuilder {
    constructor() {
        this.dynamicInvestment = new DynamicInvestment();
    }

    setDynamicInvestmentId(dynamicInvestmentId) {
        this.dynamicInvestment.dynamic_investment_id = dynamicInvestmentId;
        return this;
    }

    setWalletId(walletId) {
        this.dynamicInvestment.wallet_id = walletId;
        return this;
    }

    setCapital(capital) {
        this.dynamicInvestment.capital = capital;
        return this;
    }

    setMaturityDate(maturityDate) {
        this.dynamicInvestment.maturity_date = maturityDate;
        return this;
    }

    setResult(result) {
        this.dynamicInvestment.result = result;
        return this;
    }

    setNote(note) {
        this.dynamicInvestment.note = note;
        return this;
    }

    build() {
        return this.dynamicInvestment;
    }
}

export default DynamicInvestmentBuilder;
