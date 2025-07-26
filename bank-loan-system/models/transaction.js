'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    
    static associate(models) {
      
    }
  }
  Transaction.init({
    loan_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};