const Sequelize = require('sequelize');
const db = require('../db');

const Message = db.define('message', {
  recipientID: {
    type: Sequelize.INTEGER,
  },
  messageContent: {
    type: Sequelize.TEXT,
  },
});

module.exports = Message;
