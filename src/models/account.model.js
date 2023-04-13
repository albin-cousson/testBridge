class Transaction {
    constructor(label, amount, currency) {
        this.label = label;
        this.amount = amount;
        this.currency = currency;
    }
}

class Account {
    constructor(acc_number, amount, transactions) {
        this.acc_number = acc_number;
        this.amount = amount;
        this.transactions = transactions || [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}

module.exports = { Account, Transaction };
