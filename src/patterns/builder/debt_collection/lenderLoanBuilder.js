import { LenderLoan } from '../../../models';

class LenderLoanBuilder {
    constructor() {
        this.lenderLoan = new LenderLoan();
    }

    setLenderLoanId(lenderLoanId) {
        this.lenderLoan.lender_loan_id = lenderLoanId;
        return this;
    }

    setLenderId(lenderId) {
        this.lenderLoan.lender_id = lenderId;
        return this;
    }

    setLoanId(loanId) {
        this.lenderLoan.loan_id = loanId;
        return this;
    }

    build() {
        return this.lenderLoan;
    }
}

export default LenderLoanBuilder;
