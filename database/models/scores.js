'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scores.init({
    companyId: DataTypes.STRING,
    cpi: DataTypes.FLOAT,
    cf: DataTypes.FLOAT,
    mau: DataTypes.FLOAT,
    roic: DataTypes.FLOAT,
    score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Scores',
  });
  return Scores;
};