const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brigade extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'brigade_id' });
      this.hasMany(models.Assembler, { foreignKey: 'brigade_id' });
      this.hasMany(models.Report, { foreignKey: 'brigade_id' });
    }
  }
  Brigade.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Brigade',
  });
  return Brigade;
};
