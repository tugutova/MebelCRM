'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brigades', [
      {
        name: "первая",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "вторая",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brigades', null, {});
  },
};
