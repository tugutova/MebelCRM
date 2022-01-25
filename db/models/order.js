const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Brigade, { foreignKey: 'brigade_id' });
      this.belongsTo(models.Administrator, { foreignKey: 'administrator_id' });

      this.hasMany(models.File, { foreignKey: 'order_id' });
      this.hasMany(models.Report, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    brigade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    administrator_id: {
      type: DataTypes.INTEGER,
    },
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    address: DataTypes.STRING,
    contract: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
