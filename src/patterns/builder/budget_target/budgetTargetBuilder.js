import { BudgetTarget } from '../../../models'; 

class BudgetTargetBuilder {
    constructor() {
        this.budgetTarget = new BudgetTarget();
    }

    setBudgetTargetId(budgetTargetId) {
        this.budgetTarget.budget_target_id = budgetTargetId;
        return this;
    }

    setBudgetTargetTypeId(budgetTargetTypeId) {
        this.budgetTarget.budget_target_type_id = budgetTargetTypeId;
        return this;
    }

    setCategoryId(categoryId) {
        this.budgetTarget.category_id = categoryId;
        return this;
    }

    setAmount(amount) {
        this.budgetTarget.amount = amount;
        return this;
    }

    setFromDate(fromDate) {
        this.budgetTarget.from_date = fromDate;
        return this;
    }

    setToDate(toDate) {
        this.budgetTarget.to_date = toDate;
        return this;
    }

    setCreatedAt(createdAt) {
        this.budgetTarget.created_at = createdAt;
        return this;
    }

    setWalletId(walletId) {
        this.budgetTarget.wallet_id = walletId;
        return this;
    }

    build() {
        return this.budgetTarget;
    }
}

export default BudgetTargetBuilder;
