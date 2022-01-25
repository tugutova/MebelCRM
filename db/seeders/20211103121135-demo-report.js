module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reports', [
      {
        brigade_id: 1,
        assembler_id: 1,
        order_id: 1,
        factoryFault: true,
        managerFault: true,
        assemblerFault: true,
        assemblyActSigned: true,
        customerPresenceAtAssembly: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reports', null, {});
  },
};
