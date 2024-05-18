import { Limit } from '../../../models'; 

class LimitBuilder {
    constructor() {
        this.limit = new Limit();
    }

    setLimitId(LimitId) {
        this.limit.limit_id = LimitId;
        return this;
    }

    setCategoryId(categoryId) {
        this.limit.category_id = categoryId;
        return this;
    }

    setAmount(amount) {
        this.limit.amount = amount;
        return this;
    }

    setFromDate(fromDate) {
        this.limit.from_date = fromDate;
        return this;
    }

    setToDate(toDate) {
        this.limit.to_date = toDate;
        return this;
    }

    setWalletId(walletId) {
        this.limit.wallet_id = walletId;
        return this;
    }

    build() {
        return this.limit;
    }
}

export default LimitBuilder;
