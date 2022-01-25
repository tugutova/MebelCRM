module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Photos', [
      {
        report_id: 1,
        link: 'tmp2/my_uploads/сборщик.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        report_id: 1,
        link: 'tmp2/my_uploads/sborka-razborka-mebeli.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
