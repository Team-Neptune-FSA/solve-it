const Issue = require("../db/models/issue");
const Solution = require("../db/models/solution");
const router = require("express").Router();
const { requireToken } = require("./authMiddleware");

//GET /api/issues
router.get("/", async (req, res, next) => {
  try {
    const issues = await Issue.findAll();
    res.json(issues);
  } catch (error) {
    next(error);
  }
});

// GET /api/issues/:issueId
router.get("/:issueId", async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.issueId);
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

//PUT /api/issues/:issueId
router.put("/:issueId", requireToken, async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.issueId);
    const updatedIssue = await issue.update(req.body);
    res.json(updatedIssue);
  } catch (error) {
    next(error);
  }
});

//POST /api/issues
router.post("/", requireToken, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const issue = await Issue.create({
      title,
      description,
    });
    issue.setUser(req.user);
    req.user.issuesAsked += 1;
    await req.user.save();
    res.json(issue);
  } catch (error) {
    next(error);
  }
});

// GET api/issues/:issueId/solutions
router.get("/:issueId/solutions", async (req, res, next) => {
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

// GET api/issues/:issueId/solutions/:solutionId
router.get(
  "/:issueId/solutions/:solutionId",
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

// GET api/issues/:issueId/solutions/:solutionId
router.get("/:issueId/mySolution", requireToken, async (req, res, next) => {
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

// POST /api/issues.issueId/solutions
router.post("/:issueId/solutions", requireToken, async (req, res, next) => {
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
