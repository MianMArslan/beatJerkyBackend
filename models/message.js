'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, {
        foreignKey: 'id',
        sourceKey: 'senderId',
        as: 'sender'
      })
      this.hasOne(models.user, {
        foreignKey: 'id',
        sourceKey: 'receiverId',
        as: 'receiver'
      })
    }
  }
  message.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
      message: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'message'
    }
  )
  return message
}
