const bcrypt = require('bcrypt');

const createPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Assemblers', [
      {
        name: 'Паша',
        last_name: 'Петров',
        password: await createPassword('123'),
        email: 'petrov@gmail.com',
        phone: 224579,
        brigade_id: 1,
        role: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Савелий',
        last_name: 'Иванов',
        password: await createPassword('123'),
        email: 'ivanov@gmail.com',
        phone: 224599,
        brigade_id: 2,
        role: '1',
        createdAt: new Date(),
        updatedAt: new Date(),

      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Assemblers', null, {});
  },
};
