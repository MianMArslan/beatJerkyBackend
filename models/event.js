'use strict'
const { Model, INTEGER } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      artistProfileId: INTEGER,
      eventName: DataTypes.STRING,
      artistName: DataTypes.STRING,
      eventPlace: DataTypes.STRING,
      eventStartTime: DataTypes.DATE,
      eventEndTime: DataTypes.DATE,
      picturePath: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Event'
    }
  )
  return Event
}
