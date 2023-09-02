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
      this.belongsTo(models.stores, { foreignKey: 'storeId' })
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
      this.hasMany(models.feedLike, { foreignKey: 'feedId', sourceKey: 'id' })
      this.hasMany(models.feedComment, {
        foreignKey: 'feedId',
        sourceKey: 'id'
      })
    }
  }
  userFeed.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      storeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'userFeed'
    }
  )
  return userFeed
}
