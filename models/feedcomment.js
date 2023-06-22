'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class feedComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
    }
  }
  feedComment.init(
    {
      userId: DataTypes.INTEGER,
      feedId: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'feedComment'
    }
  )
  return feedComment
}
