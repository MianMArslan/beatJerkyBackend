'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.userFeed, { foreignKey: 'storeId', sourceKey: 'id' })
      this.hasMany(models.adminChat, { foreignKey: 'storeId' })
      this.hasMany(models.storeFollowers, {
        foreignKey: 'storeId',
        as: 'followers'
      })
      // define association here
    }
  }
  stores.init(
    {
      storeName: DataTypes.STRING,
      storeCategoryId: DataTypes.INTEGER,
      storeDescription: DataTypes.STRING,
      storeImage: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'stores'
    }
  )
  return stores
}
