import { Debt } from '../../../models';

class DebtBuilder {
    constructor() {
        this.debt = new Debt();
    }

    setDebtId(debtId) {
        this.debt.debt_id = debtId;
        return this;
    }

    setTransId(transId) {
        this.debt.trans_id = transId;
        return this;
    }

    setPaid(paid) {
        this.debt.paid = paid;
        return this;
    }

    setRemaining(remaining) {
        this.debt.remaining = remaining;
        return this;
    }

    setRemindTime(remindTime) {
        this.debt.remind_time = remindTime;
        return this;
    }

    setImage(image) {
        this.debt.image = image;
        return this;
    }

    build() {
        return this.debt;
    }
}

export default DebtBuilder;
