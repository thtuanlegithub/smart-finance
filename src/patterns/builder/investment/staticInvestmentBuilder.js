import { StaticInvestment } from '../../../models';

class StaticInvestmentBuilder {
    constructor() {
        this.staticInvestment = new StaticInvestment();
    }

    setStaticInvestmentId(staticInvestmentId) {
        this.staticInvestment.static_investment_id = staticInvestmentId;
        return this;
    }

    setWalletId(walletId) {
        this.staticInvestment.wallet_id = walletId;
        return this;
    }

    setCapital(capital) {
        this.staticInvestment.capital = capital;
        return this;
    }

    setTerm(term) {
        this.staticInvestment.term = term;
        return this;
    }

    setInterestRate(interestRate) {
        this.staticInvestment.interest_rate = interestRate;
        return this;
    }

    setMaturityMethod(maturityMethod) {
        this.staticInvestment.maturity_method = maturityMethod;
        return this;
    }

    setNote(note) {
        this.staticInvestment.note = note;
        return this;
    }

    build() {
        return this.staticInvestment;
    }
}

export default StaticInvestmentBuilder;
