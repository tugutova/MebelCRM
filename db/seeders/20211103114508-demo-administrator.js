const bcrypt = require('bcrypt');

const createPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Administrators', [
      {
        name: 'Anna',
        last_name: 'Иванова',
        password: await createPassword('123'),
        email: 'savlukganna@gmail.com',
        role: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Илона',
        last_name: 'Гольман',
        password: await createPassword('246'),
        email: 'elbrus2@gmail.com',
        role: '0',
        createdAt: new Date(),
        updatedAt: new Date(),

      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Administrators', null, {});
  },
};
