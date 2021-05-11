'use strict';

const {
  db,
  models: { User, Issue, Message, Solution },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody@gmail.com', password: '123' }),
    User.create({ username: 'murphy@gmail.com', password: '123' }),
    User.create({ username: 'jonathan@gmail.com', password: '123' }),
    User.create({ username: 'altus@gmail.com', password: '123' }),
    User.create({ username: 'nathan@gmail.com', password: '123' }),
    User.create({ username: 'matt@gmail.com', password: '123' }),
  ]);

  // Creating Issues
  const issues = await Promise.all([
    Issue.create({
      issueContent: `Given an array of integers, return indices of the two numbers such that they add up to a specific target.`,
    }),
    Issue.create({
      issueContent: `Say you have an array for which the ith element is the price of a given stock on day i.

        If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

        Note that you cannot sell a stock before you buy one.`,
    }),
    Issue.create({
      issueContent: `You are given the dimensions of a grid, m and n. Starting from the top left, or (0,0), you want to end up making your way to the bottom right corner. The only two moves you can make are to go one space directly to your right, or one space directly down. Write a function that can help you determine how many unique paths you can take between these two corners.`,
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
    Solution.create({
      solution: `const maxProfit = function(prices) {
        //intialize a variable to keep count of the current highest profit
        let maxProfit = 0;
        //create a loop to iterate through the prices until the second to last element
        for (let i = 0; i < prices.length - 1; i++){
            //the inner loop compares the prices[i] to every future price point to see if there is a higher profit
            for (let j = i + 1; j < prices.length; j++){
                let profit = prices[j] - prices[i]
                if (profit > maxProfit){
                    maxProfit = profit
                }
            }
        }
        return maxProfit
    };
    maxProfit([7,1,5,3,6,4]) //5
    maxProfit([7,6,4,3,1]) //0`,
    }),
    Solution.create({
      solution: `// initialize default value of 0 for column and row
      function uniquePaths(m, n, row = 0, col = 0) {

        // if we've reach our target cell, we know we've found a valid path
        // return 1 so that we can increment our count of unique paths
        if (row === m - 1 && col === n - 1) {
          return 1;

        // if we are trying to check a cell outside the limits of our grid, return 0
        } else if (row >= m || col >= n) {
          return 0;

        // in every other case, add up the unique paths we can find by looking to the right or looking down
        } else {
          return uniquePaths(m, n, row, col + 1) + uniquePaths(m, n, row + 1, col);
        }
      }

      uniquePaths(3,2);    // 3
      uniquePaths(3,4);    // 10
      uniquePaths(7,3);    // 28  `,
    }),
  ]);

  // Creating Messages
  const messages = await Promise.all([
    Message.create({
      recipientID: 1,
      issueContent: 'Hey, this problem is written incorrectly.',
    }),
    Message.create({
      recipientID: 1,
      issueContent: "Hi, you're missing a piece of code.",
    }),
    Message.create({
      recipientID: 1,
      issueContent: "Excuse me, this code can't be solved.",
    }),
  ]);

  await issues[0].setUser(users[2]);
  await issues[1].setUser(users[3]);
  await issues[2].setUser(users[4]);

  await issues[0].addSolution(solutions[0]);
  await issues[1].addSolution(solutions[1]);
  await issues[2].addSolution(solutions[2]);

  await messages[0].setUser(users[2]);
  await messages[1].setUser(users[3]);
  await messages[2].setUser(users[4]);

  await messages[0].setIssue(issues[0]);
  await messages[1].setIssue(issues[1]);
  await messages[2].setIssue(issues[2]);

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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
