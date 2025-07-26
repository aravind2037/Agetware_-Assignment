const { Loan, Transaction } = require('../models');

function calculateLoanDetails(principal, period, rate) {
  const interest = (principal * period * rate) / 100;
  const total_amount = principal + interest;
  const emi = Math.ceil(total_amount / (period * 12));
  return { interest, total_amount, emi };
}

exports.lendLoan = async (req, res) => {
  try {
    const { customer_id, principal, period, rate } = req.body;

    const { interest, total_amount, emi } = calculateLoanDetails(principal, period, rate);

    const loan = await Loan.create({
      customer_id,
      principal,
      rate,
      period,
      interest,
      total_amount,
      emi,
      balance_amount: total_amount,
      emis_left: period * 12
    });

    res.status(201).json({
      message: 'Loan created successfully',
      loan_id: loan.id,
      total_amount,
      emi
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.makePayment = async (req, res) => {
  try {
    const { loan_id } = req.params;

    const loan = await Loan.findByPk(loan_id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (loan.emis_left <= 0 || loan.balance_amount <= 0) {
      return res.status(400).json({ message: 'Loan is already paid off' });
    }

    // Update loan: reduce balance and EMI count
    loan.balance_amount -= loan.emi;
    loan.emis_left -= 1;

    // Handle overpayment edge case
    if (loan.balance_amount < 0) loan.balance_amount = 0;

    await loan.save();

    // Record the transaction
    await Transaction.create({
      loan_id: loan.id,
      amount_paid: loan.emi,
      payment_date: new Date()
    });

    res.status(200).json({
      message: 'Payment successful',
      loan_id: loan.id,
      remaining_balance: loan.balance_amount,
      emis_left: loan.emis_left
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
