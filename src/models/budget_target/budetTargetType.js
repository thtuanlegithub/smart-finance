class BudgetTargetType {
    constructor() {
        this.budget_target_type_id = '';
        this.budget_target_type_name = '';
    }

    getBudgetTargetTypeId() {
        return this.budget_target_type_id;
    }

    getBudgetTargetTypeName() {
        return this.budget_target_type_name;
    }

    setBudgetTargetTypeId(budget_target_type_id) {
        this.budget_target_type_id = budget_target_type_id;
    }

    setBudgetTargetTypeName(budget_target_type_name) {
        this.budget_target_type_name = budget_target_type_name;
    }
}

export default BudgetTargetType;