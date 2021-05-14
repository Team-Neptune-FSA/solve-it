//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Solution = require("./models/solution");
const Question = require("./models/question");
const Issue = require("./models/issue");
const Stat = require("./models/stat");

User.hasMany(Issue);
User.hasMany(Solution);
User.hasMany(Question);

Stat.belongsTo(User);
User.hasOne(Stat);

Issue.hasMany(Question);
Issue.hasMany(Solution);

Question.belongsTo(User);
Question.belongsTo(Issue);

Solution.belongsTo(Issue);
Solution.belongsTo(User);

Issue.belongsTo(User);

module.exports = {
  db,
  User,
  Solution,
  Issue,
  Question,
  Stat,
};
