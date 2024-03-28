'use strict'

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'deviceId', {
        type: Sequelize.STRING
      })
    ])
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('users', 'deviceId')])
  }
}
