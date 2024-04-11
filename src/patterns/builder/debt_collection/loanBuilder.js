import { Loan } from '../../../models';

class LoanBuilder {
    constructor() {
        this.loan = new Loan();
    }

    setLoanId(loanId) {
        this.loan.loan_id = loanId;
        return this;
    }

    setTransId(transId) {
        this.loan.trans_id = transId;
        return this;
    }

    setPaid(paid) {
        this.loan.paid = paid;
        return this;
    }

    setRemaining(remaining) {
        this.loan.remaining = remaining;
        return this;
    }

    setRemindTime(remindTime) {
        this.loan.remind_time = remindTime;
        return this;
    }

    setImage(image) {
        this.loan.image = image;
        return this;
    }

    build() {
        return this.loan;
    }
}

export default LoanBuilder;
