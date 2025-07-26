'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    
    static associate(models) {
    }
  }
  Loan.init({
    customer_id: DataTypes.STRING,
    principal: DataTypes.FLOAT,
    rate: DataTypes.FLOAT,
    period: DataTypes.INTEGER,
    interest: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
    emi: DataTypes.FLOAT,
    balance_amount: DataTypes.FLOAT,
    emis_left: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};