'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brigade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Brigades',
          key: 'id'
        }
      },
      administrator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Administrators',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contract: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};