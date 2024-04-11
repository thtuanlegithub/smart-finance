class BudgetTargetType {
    constructor() {
        this._budget_target_type_id = '';
        this._budget_target_type_name = '';
    }

    get budget_target_type_id() {
        return this._budget_target_type_id;
    }

    get budget_target_type_name() {
        return this._budget_target_type_name;
    }

    set budget_target_type_id(value) {
        this._budget_target_type_id = value;
    }

    set budget_target_type_name(value) {
        this._budget_target_type_name = value;
    }
}

export default BudgetTargetType;