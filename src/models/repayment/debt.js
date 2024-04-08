class Debt {
    constructor() {
        this.debt_id = '';
        this.trans_id = '';
        this.paid = 0;
        this.remaining = 0;
        this.remind_time = '';
        this.image = '';
    }

    get debt_id() {
        return this.debt_id;
    }

    set debt_id(debt_id) {
        this.debt_id = debt_id;
    }

    get trans_id() {
        return this.trans_id;
    }

    set trans_id(trans_id) {
        this.trans_id = trans_id;
    }

    get paid() {
        return this.paid;
    }

    set paid(paid) {
        this.paid = paid;
    }

    get remaining() {
        return this.remaining;
    }

    set remaining(remaining) {
        this.remaining = remaining;
    }

    get remind_time() {
        return this.remind_time;
    }

    set remind_time(remind_time) {
        this.remind_time = remind_time;
    }

    get image() {
        return this.image;
    }

    set image(image) {
        this.image = image;
    }
}

export default Debt;