import { Tax } from '../../../models';

class TaxBuilder {
    constructor() {
        this.tax = new Tax();
    }

    setTaxId(taxId) {
        this.tax.tax_id = taxId;
        return this;
    }

    setTransId(transId) {
        this.tax.trans_id = transId;
        return this;
    }

    setIncome(income) {
        this.tax.income = income;
        return this;
    }

    setInsuranceSalary(insuranceSalary) {
        this.tax.insurance_salary = insuranceSalary;
        return this;
    }

    setDependents(dependents) {
        this.tax.dependents = dependents;
        return this;
    }

    setTaxBracket(taxBracket) {
        this.tax.tax_bracket = taxBracket;
        return this;
    }

    setTaxAmount(taxAmount) {
        this.tax.tax_amount = taxAmount;
        return this;
    }

    build() {
        return this.tax;
    }
}

export default TaxBuilder;
