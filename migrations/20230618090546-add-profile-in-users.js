'use strict'

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'profileImg', {
        type: Sequelize.STRING
      })
    ])
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('users', 'profileImg')])
  }
}
