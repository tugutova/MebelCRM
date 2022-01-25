'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
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
          key: 'id',
        },
      },
      assembler_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Assemblers',
          key: 'id',
        },
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      factoryFault: {
        type: Sequelize.BOOLEAN,
      },
      managerFault: {
        type: Sequelize.BOOLEAN,
      },
      assemblerFault: {
        type: Sequelize.BOOLEAN,
      },
      assemblyActSigned: {
        type: Sequelize.BOOLEAN,
      },
      customerPresenceAtAssembly: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  },
};
