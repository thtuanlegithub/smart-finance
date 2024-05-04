import { Transaction } from '../../../models';

class TransactionBuilder {
    constructor() {
        this.transaction = new Transaction();
    }

    setTransId(transId) {
        this.transaction.trans_id = transId;
        return this;
    }

    setCategoryId(categoryId) {
        this.transaction.category_id = categoryId;
        return this;
    }

    setAmount(amount) {
        this.transaction.amount = amount;
        return this;
    }

    setNote(note) {
        this.transaction.note = note;
        return this;
    }

    setCreatedAt(createdAt) {
        this.transaction.created_at = createdAt;
        return this;
    }

    setWalletId(walletId) {
        this.transaction.wallet_id = walletId;
        return this;
    }

    setReminder(reminder) {
        this.transaction.reminder = reminder;
        return this;
    }

    setType(type) {
        this.transaction.type = type;
        return this;
    }

    setPeople(people) {
        this.transaction.people = people;
        return this;
    }

    setTax(tax) {
        this.transaction.tax = tax;
        return this;
    }

    build() {
        return this.transaction;
    }
}

export default TransactionBuilder;
