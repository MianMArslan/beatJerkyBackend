'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MusicStyleSongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MusicStyleSongs.init(
    {
      title: DataTypes.STRING,
      singer: DataTypes.STRING,
      year: DataTypes.STRING,
      descriptionOfSong: DataTypes.STRING,
      fileURL: DataTypes.STRING,
      coverImageURL: DataTypes.STRING,
      songCategoryID: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'MusicStyleSongs'
    }
  )
  return MusicStyleSongs
}
