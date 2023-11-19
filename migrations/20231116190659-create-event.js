'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistProfileId: {
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      artistName: {
        type: Sequelize.STRING
      },
      eventPlace: {
        type: Sequelize.STRING
      },
      eventStartTime: {
        type: Sequelize.DATE
      },
      eventEndTime: {
        type: Sequelize.DATE
      },
      picturePath: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      latitude: {
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
    await queryInterface.dropTable('Events')
  }
}
