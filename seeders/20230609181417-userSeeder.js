'use strict'
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = [
      {
        firstName: 'hamza',
        lastName: 'yousaf',
        email: 'hamzay050@gmail.com',
        password: await bcrypt.hash('123', process.env.SALT), // Hash the password using bcrypt
        isAdmin: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more user entries as needed
    ]

    await queryInterface.bulkInsert('users', userData, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
