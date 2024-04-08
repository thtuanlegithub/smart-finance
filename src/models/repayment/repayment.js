class Repayment {
    constructor() {
        this.repayment_id = '';
        this.trans_id = '';
        this.debt_id = '';
    }

    get repayment_id() {
        return this.repayment_id;
    }

    set repayment_id(value) {
        this.repayment_id = value;
    }

    get trans_id() {
        return this.trans_id;
    }

    set trans_id(value) {
        this.trans_id = value;  
    }

    get debt_id() {
        return this.debt_id;
    }

    set debt_id(value) {
        this.debt_id = value;
    }
}

export default Repayment;