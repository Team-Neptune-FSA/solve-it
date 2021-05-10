"use strict";

const {
  db,
  models: { User, Question, Message, Solution },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody@gmail.com", password: "123" }),
    User.create({ username: "murphy@gmail.com", password: "123" }),
    User.create({ username: "jonathan@gmail.com", password: "123" }),
    User.create({ username: "altus@gmail.com", password: "123" }),
    User.create({ username: "nathan@gmail.com", password: "123" }),
    User.create({ username: "matt@gmail.com", password: "123" }),
  ]);

  // Creating Questions
  const questions = await Promise.all([
    Question.create({
      questionContent:
        "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    }),
  ]);

  // Creating Solutions
  const solutions = await Promise.all([
    Solution.create({
      solution: `const twoSum = (arr, target) => {
            var result = [];
          
            for (var i = 0; i < arr.length; i++) {
              for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] === target) {
                  result.push(i);
                  result.push(j);
                }
              }
            }
            return result;
          }`,
    }),
  ]);

  // Creating Messages
  const messages = await Promise.all([
    Message.create({
      recipientID: 1,
      questionContent: 'Hey, how do you do this problem?' })
  ]);

  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //     Jonathan: users[2],
  //     Altus: users[3],
  //     Nathan: users[4],
  //     Matt: users[5],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
