'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class storeFollowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.stores, {
        foreignKey: 'storeId',
        as: 'store'
      })
      // define association here
    }
  }
  storeFollowers.init(
    {
      userId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'storeFollowers'
    }
  )
  return storeFollowers
}
