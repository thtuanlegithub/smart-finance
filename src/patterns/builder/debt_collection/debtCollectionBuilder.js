import { DebtCollection } from '../../../models';

class DebtCollectionBuilder {
    constructor() {
        this.debtCollection = new DebtCollection();
    }

    setDebtCollectionId(debtCollectionId) {
        this.debtCollection.debt_collection_id = debtCollectionId;
        return this;
    }

    setTransId(transId) {
        this.debtCollection.trans_id = transId;
        return this;
    }

    setLoanId(loanId) {
        this.debtCollection.loan_id = loanId;
        return this;
    }

    build() {
        return this.debtCollection;
    }
}

export default DebtCollectionBuilder;
