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
      issueOwner.totalEscrow -= Number(req.body.issue.price);
      issueOwner.totalPaid += Number(req.body.issue.price);
      problemSolver.totalEarned += Number(req.body.issue.price);
      problemSolver.solutionsAccepted += 1;
      await issueOwner.save();
      await problemSolver.save();
    }
  } catch (error) {
    next(error);
  }
});
