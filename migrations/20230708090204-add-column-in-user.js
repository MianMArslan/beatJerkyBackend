'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'isOnline', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
    queryInterface.addColumn('users', 'lastOnline', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'isOnline')
    queryInterface.removeColumn('users', 'lastOnline')
  }
}
