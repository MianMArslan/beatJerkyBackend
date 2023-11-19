'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ArtistSongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArtistSongs.init(
    {
      artistId: DataTypes.INTEGER,

      songName: DataTypes.STRING,
      songPath: DataTypes.STRING,
      songCategoryId: DataTypes.INTEGER,
      picturePath: DataTypes.STRING,
      artistName: DataTypes.STRING,
      bandName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ArtistSongs'
    }
  )
  return ArtistSongs
}
