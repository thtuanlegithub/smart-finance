class Loan {
    constructor() {
        this.loan_id = '';
        this.trans_id = '';
        this.paid = 0;
        this.remaining = 0;
        this.remind_time = 0;
        this.image = '';
    }

    get loan_id() {
        return this.loan_id;
    }

    set loan_id(value) {
        this.loan_id = value;
    }

    get trans_id() {
        return this.trans_id;
    }

    set trans_id(value) {
        this.trans_id = value;
    }

    get paid() {
        return this.paid;
    }

    set paid(value) {
        this.paid = value;
    }

    get remaining() {
        return this.remaining;
    }

    set remaining(value) {
        this.remaining = value;
    }

    get remind_time() {
        return this.remind_time;
    }

    set remind_time(value) {
        this.remind_time = value;
    }

    get image() {
        return this.image;
    }

    set image(value) {
        this.image = value;
    }
}

export default Loan;