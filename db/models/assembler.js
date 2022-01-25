const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Assembler extends Model {
    static associate(models) {
      this.belongsTo(models.Brigade, { foreignKey: 'brigade_id' });
      this.hasMany(models.Report, { foreignKey: 'assembler_id' });
    }
  }
  Assembler.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brigade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Assembler',
  });
  return Assembler;
};
