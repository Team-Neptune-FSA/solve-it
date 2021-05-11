const Sequelize = require('sequelize');
const db = require('../db');

const Issue = db.define('issue', {
  issueContent: {
    type: Sequelize.TEXT,
  },
});

module.exports = Issue;
