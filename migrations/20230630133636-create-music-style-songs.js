'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MusicStyleSongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      singer: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      descriptionOfSong: {
        type: Sequelize.STRING
      },
      fileURL: {
        type: Sequelize.STRING
      },
      coverImageURL: {
        type: Sequelize.STRING
      },
      songCategoryID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MusicStyleSongs');
  }
};