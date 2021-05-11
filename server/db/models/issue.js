const Sequelize = require('sequelize');
const db = require('../db');

const Issue = db.define('issue', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Issue;
