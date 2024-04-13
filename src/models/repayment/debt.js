class Debt {
    constructor() {
        this._debt_id = '';
        this._trans_id = '';
        this._paid = 0;
        this._remaining = 0;
        this._remind_time = '';
        this._image = '';
    }

    get debt_id() {
        return this._debt_id;
    }

    set debt_id(value) {
        this._debt_id = value;
    }

    get trans_id() {
        return this._trans_id;
    }

    set trans_id(value) {
        this._trans_id = value;
    }

    get paid() {
        return this._paid;
    }

    set paid(value) {
        this._paid = value;
    }

    get remaining() {
        return this._remaining;
    }

    set remaining(value) {
        this._remaining = value;
    }

    get remind_time() {
        return this._remind_time;
    }

    set remind_time(value) {
        this._remind_time = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }
}

export default Debt;