const axios = require('axios');

const apiKey = '17066624-8fef-4b49-b2b5-d0b8cebcf171';

exports.getAccounts = (req, res, next) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    };

    axios.get('https://dsague.fr/accounts', config)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                res.status(401).json({ error: 'Unauthorized: API key missing or incorrect' });
            } else {
                res.status(500).json({ error });
            }
        });
};

exports.getAccountsAndTransactions = async (req, res, next) => {
    try {
        // Récupérer les comptes
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            }
        };
        const responseAccounts = await axios.get('https://dsague.fr/accounts', config);
        const accounts = responseAccounts.data.accounts;

        // Récupérer les transactions pour chaque compte
        const promises = accounts.map(async account => {
            const responseTransactions = await axios.get(`https://dsague.fr/accounts/${account.acc_number}/transactions`, config);
            const transactions = responseTransactions.data.transactions;
            return {
                acc_number: account.acc_number,
                amount: account.amount,
                transactions: transactions
            };
        });

        // Récupérer les comptes avec leurs transactions sans doublons
        const accountsWithUniqueTransactions = [];
        const transactionsSet = new Set();
        for (const promise of promises) {
            const account = await promise;
            const uniqueTransactions = account.transactions.filter(transaction => {
                const transactionStr = JSON.stringify(transaction);
                const isDuplicate = transactionsSet.has(transactionStr);
                transactionsSet.add(transactionStr);
                return !isDuplicate;
            });
            account.transactions = uniqueTransactions;
            accountsWithUniqueTransactions.push(account);
        }

        res.status(200).json(accountsWithUniqueTransactions);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.status(401).json({ error: 'Unauthorized: API key missing or incorrect' });
        } else {
            res.status(500).json({ error });
        }
    }
};

exports.getSpecificTransactionsAccount = (req, res, next) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    };
    const accountNumber = req.params.acc_number;

    axios.get(`https://dsague.fr/accounts/${accountNumber}/transactions`, config)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                res.status(401).json({ error: 'Unauthorized: API key missing or incorrect' });
            } else if (error.response && error.response.status === 404) {
                res.status(404).json({ error: `Account ${accountNumber} not found` });
            } else {
                res.status(500).json({ error });
            }
        });
};