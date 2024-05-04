class Transaction {
    constructor() {
        this.trans_id = '';
        this.category_id = '';
        this.amount = 0;
        this.note = '';
        this.created_at = '';
        this.wallet_id = '';
        this.reminder = null;
        this.type = null;   
        this.people = null;
        this.tax = null;
    }
}

export default Transaction;
