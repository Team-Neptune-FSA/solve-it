//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Solution = require('./models/solution');
const Message = require('./models/message');
const Issue = require('./models/issue');

User.hasMany(Issue);
User.hasMany(Solution);
User.hasMany(Message);

Issue.hasMany(Message);
Issue.hasMany(Solution);

Message.belongsTo(User);
Message.belongsTo(Issue);

Solution.belongsTo(Issue);
Solution.belongsTo(User);

Issue.belongsTo(User);

module.exports = {
  db,
    User,
    Solution,
    Issue,
    Message,
};
