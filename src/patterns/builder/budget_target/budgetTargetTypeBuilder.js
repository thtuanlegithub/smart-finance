import { BudgetTargetType } from '../../../models';

class BudgetTargetTypeBuilder {
    constructor() {
        this.budgetTargetType = new BudgetTargetType();
    }

    setBudgetTargetTypeId(budgetTargetTypeId) {
        this.budgetTargetType.budget_target_type_id = budgetTargetTypeId;
        return this;
    }

    setBudgetTargetTypeName(budgetTargetTypeName) {
        this.budgetTargetType.budget_target_type_name = budgetTargetTypeName;
        return this;
    }

    build() {
        return this.budgetTargetType;
    }
}

export default BudgetTargetTypeBuilder;
