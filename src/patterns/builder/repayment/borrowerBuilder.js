import { Borrower } from '../../../models';

class BorrowerBuilder {
    constructor() {
        this.borrower = new Borrower();
    }

    setBorrowerId(borrowerId) {
        this.borrower.borrower_id = borrowerId;
        return this;
    }

    setBorrowerName(borrowerName) {
        this.borrower.borrower_name = borrowerName;
        return this;
    }

    setBorrowerPhone(borrowerPhone) {
        this.borrower.borrower_phone = borrowerPhone;
        return this;
    }

    build() {
        return this.borrower;
    }
}

export default BorrowerBuilder;

