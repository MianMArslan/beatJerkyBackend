'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ArtistProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArtistProfile.init(
    {
      userId: DataTypes.INTEGER,
      artistName: DataTypes.STRING,
      bandName: DataTypes.STRING,
      about: DataTypes.STRING,
      picture: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ArtistProfile'
    }
  )
  return ArtistProfile
}
