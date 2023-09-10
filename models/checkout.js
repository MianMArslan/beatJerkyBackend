'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  checkout.init({
    productName: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    storeName: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productDiscount: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
    orderStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'checkout',
  });
  return checkout;
};