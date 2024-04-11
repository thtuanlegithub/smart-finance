import { Lender } from '../../../models';

class LenderBuilder {
    constructor() {
        this.lender = new Lender();
    }

    setLenderId(lenderId) {
        this.lender.lender_id = lenderId;
        return this;
    }

    setLenderName(lenderName) {
        this.lender.lender_name = lenderName;
        return this;
    }

    setLenderPhone(lenderPhone) {
        this.lender.lender_phone = lenderPhone;
        return this;
    }

    build() {
        return this.lender;
    }
}

export default LenderBuilder;
