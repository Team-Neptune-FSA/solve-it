const Solution = require('../db/models/solution');

const router = require('express').Router();

const {requireToken} = require('./authMiddleware')

//GET /api/issues
// router.get('/', async (req, res, next) => {
//   try {
//     const solutions = await Solution.findAll();
//     res.json(issues);
//   } catch (error) {
//     next(error);
//   }
// });

// GET /api/issues/:issueId
// router.get('/:issueId', async (req, res, next) => {
//   try {
//     const issue = await Issue.findByPk(req.params.issueId);
//     res.json(issue);
//   } catch (error) {
//     next(error);
//   }
// });

//POST /api/solutions
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { explanation, code, issue } = req.body;
    const solution = await Solution.create({
        explanation,
        code,
    });
    await solution.setUser(req.user)
    await solution.setIssue(issue.id)
    // await issue.addSolution(solution)
    res.json(solution);
  } catch (error) {
    next(error);
  }
});

module.exports = router;