'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.categories, { foreignKey: 'songCategoryID' });
    }
  }
  songs.init(
    {
      title: DataTypes.STRING,
      singer: DataTypes.STRING,
      year: DataTypes.STRING,
      descriptionOfSong: DataTypes.STRING,
      fileURL: DataTypes.STRING,
      coverImageURL: {
        type: DataTypes.STRING,
        allowNull: true
      },
      songCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
  
    },
    {
      sequelize,
      modelName: 'songs'
    }
  )
  return songs
}
