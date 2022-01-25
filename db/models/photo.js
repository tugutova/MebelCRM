'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {

    static associate(models) {
      this.belongsTo(models.Report, { foreignKey: 'report_id' })

    }
  };
  Photo.init({
    report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
