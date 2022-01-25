const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Administrator extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'administrator_id' });
    }
  }
  Administrator.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Administrator',
  });
  return Administrator;
};
