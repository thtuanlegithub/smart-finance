import { BorrowerDebt } from '../../../models';

class BorrowerDebtBuilder {
    constructor() {
        this.borrowerDebt = new BorrowerDebt();
    }

    setBorrowerDebtId(borrowerDebtId) {
        this.borrowerDebt.borrower_debt_id = borrowerDebtId;
        return this;
    }

    setBorrowerId(borrowerId) {
        this.borrowerDebt.borrower_id = borrowerId;
        return this;
    }

    setDebtId(debtId) {
        this.borrowerDebt.debt_id = debtId;
        return this;
    }

    build() {
        return this.borrowerDebt;
    }
}

export default BorrowerDebtBuilder;
