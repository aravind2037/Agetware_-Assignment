'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.STRING
      },
      principal: {
        type: Sequelize.FLOAT
      },
      rate: {
        type: Sequelize.FLOAT
      },
      period: {
        type: Sequelize.INTEGER
      },
      interest: {
        type: Sequelize.FLOAT
      },
      total_amount: {
        type: Sequelize.FLOAT
      },
      emi: {
        type: Sequelize.FLOAT
      },
      balance_amount: {
        type: Sequelize.FLOAT
      },
      emis_left: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Loans');
  }
};