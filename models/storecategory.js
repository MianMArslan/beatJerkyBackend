'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class storeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  storeCategory.init({
    storeCategoryName: DataTypes.STRING,
    storeCategoryDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'storeCategory',
  });
  return storeCategory;
};