const Sequelize = require('sequelize');
const db = require('../db');

const Solution = db.define('solution', {
  explanation: {
    type: Sequelize.TEXT,
  },
  code: {
    type: Sequelize.TEXT,
  },
  isSubmitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAccepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Solution;
