'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init(
    {
      productName: DataTypes.STRING,
      productDescription: DataTypes.STRING,
      productPrice: DataTypes.INTEGER,
      productDiscount: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      productImg1: DataTypes.STRING,
      productImg2: DataTypes.STRING,
      productImg3: DataTypes.STRING,
      productImg4: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'products'
    }
  )
  return products
}
