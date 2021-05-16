const Sequelize = require('sequelize');
const db = require('../db');

const Stat = db.define('stat', {
  solutionsAttempted: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  solutionsAccepted: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalPaid: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  totalEarned: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  totalEscrow: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Stat;
