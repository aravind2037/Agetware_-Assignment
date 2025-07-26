const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/lend', loanController.lendLoan);
router.post('/payment/:loan_id', loanController.makePayment);


module.exports = router;
