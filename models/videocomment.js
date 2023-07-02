'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class videoComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
    }
  }
  videoComment.init(
    {
      userId: DataTypes.INTEGER,
      videoId: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'videoComment'
    }
  )
  return videoComment
}
