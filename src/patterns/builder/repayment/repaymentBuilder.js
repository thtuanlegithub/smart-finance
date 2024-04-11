import { Repayment } from '../../../models';

class RepaymentBuilder {
    constructor() {
        this.repayment = new Repayment();
    }

    setRepaymentId(repaymentId) {
        this.repayment.repayment_id = repaymentId;
        return this;
    }

    setTransId(transId) {
        this.repayment.trans_id = transId;
        return this;
    }

    setDebtId(debtId) {
        this.repayment.debt_id = debtId;
        return this;
    }

    build() {
        return this.repayment;
    }
}

export default RepaymentBuilder;
