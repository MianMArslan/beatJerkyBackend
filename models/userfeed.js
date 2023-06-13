'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class userFeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
    }
  }
  userFeed.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'userFeed'
    }
  )
  return userFeed
}
