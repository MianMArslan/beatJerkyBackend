'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class videoLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
    }
  }
  videoLike.init(
    {
      userId: DataTypes.INTEGER,
      videoId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'videoLike'
    }
  )
  return videoLike
}
