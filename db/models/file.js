const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      this.belongsTo(models.Brigade, { foreignKey: 'order_id' });
    }
  }
  File.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
