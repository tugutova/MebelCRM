const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      this.belongsTo(models.Brigade, { foreignKey: 'brigade_id' });
      this.belongsTo(models.Assembler, { foreignKey: 'assembler_id' });
      this.belongsTo(models.Order, { foreignKey: 'order_id' });
      this.hasMany(models.Photo, { foreignKey: 'report_id' });
    }
  }
  Report.init({
    brigade_id: DataTypes.INTEGER,
    assembler_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    factoryFault: DataTypes.BOOLEAN,
    managerFault: DataTypes.BOOLEAN,
    assemblerFault: DataTypes.BOOLEAN,
    assemblyActSigned: DataTypes.BOOLEAN,
    customerPresenceAtAssembly: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
