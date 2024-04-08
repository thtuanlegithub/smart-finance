class BudgetTarget {
    constructor() {
        this.budget_target_id = '';
        this.budget_target_type_id = '';
        this.category_id = '';
        this.amount = 0;
        this.from_date = '';
        this.to_date = '';
        this.created_at = '';
        this.wallet_id = '';
    }

    set budgetTargetId(budget_target_id) {
        this.budget_target_id = budget_target_id;
    }
    get budgetTargetId() {
        return this.budget_target_id;
    }

    set budgetTargetTypeId(budget_target_type_id) {
        this.budget_target_type_id = budget_target_type_id;
    }
    get budgetTargetTypeId() {
        return this.budget_target_type_id;
    }

    set categoryId(category_id) {
        this.category_id = category_id;
    }
    get categoryId() {
        return this.category_id;
    }

    set amount(amount) {
        this.amount = amount;
    }
    get amount() {
        return this.amount;
    }

    set fromDate(from_date) {
        this.from_date = from_date;
    }
    get fromDate() {
        return this.from_date;
    }

    set toDate(to_date) {
        this.to_date = to_date;
    }
    get toDate() {
        return this.to_date;
    }

    set createdAt(created_at) {
        this.created_at = created_at;
    }
    get createdAt() {
        return this.created_at;
    }
    
    set walletId(wallet_id) {
        this.wallet_id = wallet_id;
    }
    get walletId() {
        return this.wallet_id;
    }
}

export default BudgetTarget;