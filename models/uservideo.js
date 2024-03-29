'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class userVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
      this.hasMany(models.videoLike, { foreignKey: 'videoId', sourceKey: 'id' })
      this.hasMany(models.videoComment, {
        foreignKey: 'videoId',
        sourceKey: 'id'
      })
    }
  }
  userVideo.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      videoUrl: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'userVideo'
    }
  )
  return userVideo
}
