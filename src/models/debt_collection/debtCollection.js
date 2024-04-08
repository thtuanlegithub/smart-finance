class DebtCollection {
    constructor() {
        this.debt_collection_id = '';
        this.trans_id = '';
        this.loan_id = '';
    }

    get debt_collection_id() {
        return this.debt_collection_id;
    }

    set debt_collection_id(value) {
        this.debt_collection_id = value;
    }

    get trans_id() {    
        return this.trans_id;
    }

    set trans_id(value) {   
        this.trans_id = value;
    }
    
    get loan_id() {
        return this.loan_id;
    }

    set loan_id(value) {
        this.loan_id = value;
    }   
}

export default DebtCollection;