const Issue = require('../db/models/issue');
const Solution = require('../db/models/solution');
const Stat = require('../db/models/stat');
const router = require('express').Router();
const { requireToken } = require('./authMiddleware');
const { Op } = require('sequelize');

//GET /api/issues
router.get('/', async (req, res, next) => {
  try {
    const issues = await Issue.findAll();
    res.json(issues);
  } catch (error) {
    next(error);
  }
});

// GET /api/issues/:issueId
router.get('/:issueId', async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.issueId);
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

// PUT /api/issues/:issueId
router.put('/:issueId', requireToken, async (req, res, next) => {
  try {
    const issue = await Issue.findOne({
      where: {
        userId: req.user.id,
        id: req.params.issueId,
      },
    });
    issue.isResolved = true;
    await issue.save();
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

//POST /api/issues
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { title, description, price, language } = req.body;
    const issue = await Issue.create({
      title,
      description,
      price,
      language,
    });
    const stats = await Stat.findOne({
      where: {
        userId: req.user.id,
      },
    });
    issue.setUser(req.user);
    stats.totalEscrow += price;
    await stats.save();
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

// GET api/issues/:issueId/solutions
router.get('/:issueId/solutions', async (req, res, next) => {
  try {
    const solution = await Solution.findAll({
      where: {
        issueId: req.params.issueId,
      },
    });
    res.json(solution);
  } catch (error) {
    next(error);
  }
});

// PUT api/issues/:issueId/solutions
router.put('/:issueId/solutions', async (req, res, next) => {
  try {
    const solution = await Solution.findAll({
      where: {
        issueId: req.params.issueId,
        id: {
          [Op.ne]: req.body.solutionId,
        },
      },
    });
    solution.map(async (singleSolution) => {
      singleSolution.isRejected = true;
      await singleSolution.save();
    });
    res.json(solution);
  } catch (error) {
    next(error);
  }
});

// GET api/issues/:issueId/solutions/:solutionId
router.get(
  '/:issueId/solutions/:solutionId',
  requireToken,
  async (req, res, next) => {
    try {
      const solution = await Solution.findByPk(req.params.solutionId);
      console.log(solution);
      res.json(solution);
    } catch (error) {
      next(error);
    }
  }
);

// PUT api/issues/:issueId/solutions/:solutionId
router.put(
  '/:issueId/solutions/:solutionId',
  requireToken,
  async (req, res, next) => {
    try {
      const solution = await Solution.findByPk(req.params.solutionId);
      await solution.update(req.body);
      res.json(solution);
    } catch (error) {
      next(error);
    }
  }
);

// GET api/issues/:issueId/solutions/:solutionId
router.get('/:issueId/mySolution', requireToken, async (req, res, next) => {
  try {
    const solution = await Solution.findOne({
      where: {
        userId: req.user.id,
        issueId: req.params.issueId,
      },
    });
    res.json(solution);
  } catch (error) {
    next(error);
  }
});

// PUT /api/issues.issueId/solutions
router.post('/:issueId/solutions', requireToken, async (req, res, next) => {
  try {
    const solution = await Solution.findOne({
      where: {
        userId: req.user.id,
        issueId: req.params.issueId,
      },
    });
    if (solution) {
      const updatedSolution = await solution.update(req.body);
      res.json(updatedSolution);
    } else {
      const newSolution = await Solution.create({
        ...req.body,
        userId: req.user.id,
        issueId: req.params.issueId,
      });
      res.json(newSolution);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
