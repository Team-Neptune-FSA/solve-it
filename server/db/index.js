//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Solution = require('./models/solution')
const Message = require('./models/message')
const Question = require('./models/question')

User.hasMany(Question)
User.hasMany(Solution)
User.hasMany(Message)

Question.hasMany(Message)
Question.hasMany(Solution)

Message.belongsTo(User)
Message.belongsTo(Question)

Solution.belongsTo(Question)
Solution.belongsTo(User)

Question.belongsTo(User)


module.exports = {
  db,
  models: {
    User,
    Solution,
    Question,
    Message
  },
}
