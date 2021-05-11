const Issue = require('../db/models/issue');

const router = require('express').Router();

const {requireToken} = require('./authMiddleware')

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

//POST /api/issues
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const issue = await Issue.create({
      title,
      description,
    });
    issue.setUser(req.user)
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
