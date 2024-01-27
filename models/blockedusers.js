'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class blockedUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blockedUsers.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      blockedUserId: { type: DataTypes.INTEGER, unique: true, allowNull: false }
    },
    {
      sequelize,
      modelName: 'blockedUsers'
    }
  )
  return blockedUsers
}
