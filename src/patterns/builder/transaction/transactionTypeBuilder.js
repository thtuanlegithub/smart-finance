import { TransactionType } from '../../../models';

class TransactionTypeBuilder {
    constructor() {
        this.transactionType = new TransactionType();
    }

    setTransTypeId(transTypeId) {
        this.transactionType.trans_type_id = transTypeId;
        return this;
    }

    setTransTypeName(transTypeName) {
        this.transactionType.trans_type_name = transTypeName;
        return this;
    }

    build() {
        return this.transactionType;
    }
}

export default TransactionTypeBuilder;
