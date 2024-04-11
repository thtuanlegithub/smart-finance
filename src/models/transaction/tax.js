class Tax {
    constructor() {
        this._tax_id = '';
        this._trans_id = ''; 
        this._income = 0;
        this._insurance_salary = 0;
        this._dependents = 0;
        this._tax_bracket = 0;
        this._tax_amount = 0;
    }

    get tax_id() {
        return this._tax_id;
    }

    set tax_id(value) {
        this._tax_id = value;
    }

    get trans_id() {
        return this._trans_id;
    }

    set trans_id(value) {
        this._trans_id = value;
    }

    get income() {
        return this._income;
    }

    set income(value) {
        this._income = value;
    }

    get insurance_salary() {
        return this._insurance_salary;
    }

    set insurance_salary(value) {
        this._insurance_salary = value;
    }

    get dependents() {
        return this._dependents;
    }

    set dependents(value) {
        this._dependents = value;
    }

    get tax_bracket() {
        return this._tax_bracket;
    }

    set tax_bracket(value) {
        this._tax_bracket = value;
    }

    get tax_amount() {
        return this._tax_amount;
    }

    set tax_amount(value) {
        this._tax_amount = value;
    }
}

export default Tax;