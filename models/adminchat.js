'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class adminChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      adminChat.belongsTo(models.user, {
        foreignKey: 'senderId',
        as: 'sender'
      })
      // define association here
    }
  }
  adminChat.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      conversationId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'adminChat'
    }
  )
  return adminChat
}
