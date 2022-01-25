'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        brigade_id: 1,
        administrator_id: 1,
        date: "2021-11-11",
        time: "15:00",
        address: "Ленинский проспект,4",
        contract: 1,
        comment: "предварительно позвонить",
        status: "выполнен",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brigade_id: 2,
        administrator_id: 2,
        date: "2021-11-12",
        time: "12:00",
        address: "Проспект Мира,6",
        contract: 2,
        comment: "домофон работает",
        status: "новый",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        brigade_id: 1,
        administrator_id: 1,
        date: "2021-11-13",
        time: "14:00",
        address: "Ленинский проспект,2",
        contract: 3,
        comment: "предварительно позвонить",
        status: "новый",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brigade_id: 1,
        administrator_id: 1,
        date: "2021-11-10",
        time: "18:00",
        address: "Ленинина, 5 - 12",
        contract: 4,
        comment: "встретят у подъезда, позвонить",
        status: "новый",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brigade_id: 1,
        administrator_id: 1,
        date: "2021-11-11",
        time: "10:30",
        address: "Проспект Победы,22-44",
        contract: 5,
        comment: "предварительно позвонить",
        status: "новый",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brigade_id: 1,
        administrator_id: 1,
        date: "2021-11-11",
        time: "10:30",
        address: "Проспект Калашникова,2-44",
        contract: 6,
        comment: "нет домофона",
        status: "новый",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
