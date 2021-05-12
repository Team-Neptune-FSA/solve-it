const Sequelize = require("sequelize");
const db = require("../db");

const Issue = db.define("issue", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Issue;
