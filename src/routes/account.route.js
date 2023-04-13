const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/accounts', accountController.getAccounts);
router.get('/accountsAndTransactions', accountController.getAccountsAndTransactions);
router.get('/account/:acc_number/transactions', accountController.getSpecificTransactionsAccount);
 
module.exports = router;