const router = require('express').Router();
const { User, Issue, Solution, Stat } = require('../db');
const { requireToken } = require('./authMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const stats = await Stat.findAll();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (!req.body.issue.isResolved) {
      const issueOwner = await Stat.findOne({
        where: {
          userId: req.body.issue.userId,
        },
      });
      const problemSolver = await Stat.findOne({
        where: {
          userId: req.body.solution.userId,
        },
      });
      issueOwner.totalEscrow -= req.body.issue.price;
      issueOwner.totalPaid += req.body.issue.price;
      problemSolver.totalEarned += req.body.issue.price;
      await issueOwner.save();
      await problemSolver.save();
      console.log('hi from stats');
    }
  } catch (error) {
    next(error);
  }
});
