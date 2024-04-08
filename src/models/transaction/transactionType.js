class TransactionType {
    constructor() {
        this.trans_type_id = '';
        this.trans_type_name = '';
    }

    getTransTypeId() {
        return this.trans_type_id;
    }

    getTransTypeName() {
        return this.trans_type_name;
    }

    setTransTypeId(trans_type_id) {
        this.trans_type_id = trans_type_id;
    }

    setTransTypeName(trans_type_name) {
        this.trans_type_name = trans_type_name;
    }
}

export default TransactionType;