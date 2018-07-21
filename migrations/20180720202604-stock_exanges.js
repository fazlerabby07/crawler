'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('stock_exchanges', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sl: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      ltp: {
        type: Sequelize.DOUBLE,
      },
      high: {
        type: Sequelize.DOUBLE,
      },
      low: {
        type: Sequelize.DOUBLE,
      },
      openp: {
        type: Sequelize.DOUBLE,
      },
      closep: {
        type: Sequelize.DOUBLE,
      },
      ycp: {
        type: Sequelize.DOUBLE,
      },
      trade: {
        type: Sequelize.DOUBLE,
      },
      value: {
        type: Sequelize.DOUBLE,
      },
      volume: {
        type: Sequelize.DOUBLE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: Sequelize.DATE,
  
    })
  },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
