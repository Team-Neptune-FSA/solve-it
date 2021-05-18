const Sequelize = require("sequelize");
const db = require("../db");

const Issue = db.define("issue", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  isResolved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Issue;
