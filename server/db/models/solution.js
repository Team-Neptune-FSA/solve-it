const Sequelize = require('sequelize')
const db = require('../db')

const Solution = db.define('solution', {
    solution: {
      type: Sequelize.TEXT,
    },
  })
  
  module.exports = Solution