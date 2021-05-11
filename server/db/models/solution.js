const Sequelize = require("sequelize");
const db = require("../db");

const Solution = db.define("solution", {
  explanation: {
    type: Sequelize.TEXT,
  },
  code: {
    type: Sequelize.TEXT,
  },
});

module.exports = Solution;
