'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArtistSongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER
      },
      songName: {
        type: Sequelize.STRING
      },
      songPath: {
        type: Sequelize.STRING
      },
      songCategoryId: {
        type: Sequelize.INTEGER
      },
      picturePath: {
        type: Sequelize.STRING
      },
      artistName: {
        type: Sequelize.STRING
      },
      bandName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ArtistSongs')
  }
}
