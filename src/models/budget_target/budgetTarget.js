class BudgetTarget {
    constructor() {
        this._budget_target_id = '';
        this._budget_target_type_id = '';
        this._category_id = '';
        this._amount = 0;
        this._from_date = '';
        this._to_date = '';
        this._created_at = '';
        this._wallet_id = '';
    }

    get budget_target_id() {
        return this._budget_target_id;
    }

    set budget_target_id(value) {
        this._budget_target_id = value;
    }

    get budget_target_type_id() {
        return this._budget_target_type_id;
    }

    set budget_target_type_id(value) {
        this._budget_target_type_id = value;
    }

    get category_id() {
        return this._category_id;
    }

    set category_id(value) {
        this._category_id = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get from_date() {
        return this._from_date;
    }

    set from_date(value) {
        this._from_date = value;
    }

    get to_date() {
        return this._to_date;
    }

    set to_date(value) {
        this._to_date = value;
    }

    get created_at() {
        return this._created_at;
    }

    set created_at(value) {
        this._created_at = value;
    }

    get wallet_id() {
        return this._wallet_id;
    }

    set wallet_id(value) {
        this._wallet_id = value;
    }
}

export default BudgetTarget;