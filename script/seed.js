"use strict";

const { db, User, Issue, Question, Solution, Stat } = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "jonathan@gmail.com",
      password: "123",
      name: "Jonathan",
    }),
    User.create({
      email: "altus@gmail.com",
      password: "123",
      name: "Altus",
    }),
    User.create({
      email: "nathan@gmail.com",
      password: "123",
      name: "Nathan",
    }),
    User.create({
      email: "matt@gmail.com",
      password: "123",
      name: "Matt",
    }),
  ]);

  // Creating Stats
  const stats = await Promise.all([
    Stat.create(),
    Stat.create({
      totalEscrow: 500,
      solutionsAttempted: 2,
    }),
    Stat.create({
      totalEscrow: 2500,
      solutionsAttempted: 1,
    }),
    Stat.create({
      totalEscrow: 1000,
      solutionsAttempted: 1,
    }),
  ]);

  // Creating Issues
  const issues = await Promise.all([
    Issue.create({
      title: "Array of integers",
      description: `Given an array of integers, return indices of the two numbers such that they add up to a specific target.`,
      price: 5,
      language: "javascript",
    }),
    Issue.create({
      title: "Price of a given day",
      description: `Say you have an array for which the ith element is the price of a given stock on day i.

        If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

        Note that you cannot sell a stock before you buy one.`,
      price: 25,
      language: "javascript",
    }),
    Issue.create({
      title: "Dimensions of a grid",
      description: `You are given the dimensions of a grid, m and n. Starting from the top left, or (0,0), you want to end up making your way to the bottom right corner. The only two moves you can make are to go one space directly to your right, or one space directly down. Write a function that can help you determine how many unique paths you can take between these two corners.`,
      price: 10,
      language: "javascript",
    }),
    Issue.create({
      title: "Valid Parentheses",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
      price: 20,
      language: "javascript",
    }),
    Issue.create({
      title: "Defanging an IP Address",
      description: `Given a valid (IPv4) IP address, return a defanged version of that IP address. A defanged IP address replaces every period "." with "[.]".`,
      price: 30,
      language: "javascript",
    }),
    Issue.create({
      title: "Redundant Connection II",
      description: `In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.
      The given input is a directed graph that started as a rooted tree with n nodes (with distinct values from 1 to n), with one additional directed edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.`,
      price: 75,
      language: "javascript",
    }),
    Issue.create({
      title: "Richest Customer Wealth",
      description: `You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the i​​​​​​​​​​​th​​​​ customer has in the j​​​​​​​​​​​th​​​​ bank. Return the wealth that the richest customer has. A customer's wealth is the amount of money they have in all their bank accounts. The richest customer is the customer that has the maximum wealth.`,
      price: 100,
      language: "javascript",
    }),
    Issue.create({
      title: "Recover Binary Search Tree",
      description: `You are given the root of a binary search tree (BST), where exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.`,
      price: 150,
      language: "javascript",
    }),
  ]);

  // Creating Solutions
  const solutions = await Promise.all([
    Solution.create({
      explanation: `test explanation from DB`,
      code: `const twoSum = (arr, target) => {
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
      isSubmitted: true,
    }),
    Solution.create({
      explanation: `test explanation from DB`,
      code: `const maxProfit = function(prices) {
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
      isSubmitted: true,
    }),
    Solution.create({
      code: `// initialize default value of 0 for column and row
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
    Solution.create({
      explanation: `I solved the problem`,
      code: `const twoSum = (arr, target) => {
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
      isSubmitted: true,
    }),
  ]);

  // Creating Questions
  const questions = await Promise.all([
    Question.create({
      questionContent: "Hey, this problem is written incorrectly.",
      answer: "Hey I fixed it.",
    }),
    Question.create({
      questionContent: "Hi, you're missing a piece of code.",
    }),
    Question.create({
      questionContent: "Excuse me, this code can't be solved.",
    }),
  ]);

  await stats[0].setUser(users[0]);
  await stats[1].setUser(users[1]);
  await stats[2].setUser(users[2]);
  await stats[3].setUser(users[3]);

  await issues[0].setUser(users[0]);
  await issues[1].setUser(users[1]);
  await issues[2].setUser(users[2]);
  await issues[3].setUser(users[3]);
  await issues[4].setUser(users[0]);
  await issues[5].setUser(users[1]);
  await issues[6].setUser(users[2]);
  await issues[7].setUser(users[3]);

  await solutions[0].setUser(users[1]);
  await solutions[1].setUser(users[1]);
  await solutions[2].setUser(users[2]);
  await solutions[3].setUser(users[3]);

  await issues[0].addSolution(solutions[0]);
  await issues[1].addSolution(solutions[1]);
  await issues[2].addSolution(solutions[2]);
  await issues[0].addSolution(solutions[3]);

  await questions[0].setUser(users[0]);
  await questions[1].setUser(users[1]);
  await questions[2].setUser(users[2]);

  await questions[0].setIssue(issues[0]);
  await questions[1].setIssue(issues[1]);
  await questions[2].setIssue(issues[2]);

  console.log(`seeded successfully`);
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
