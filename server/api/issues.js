const Issue = require("../db/models/issue");
const Solution = require("../db/models/solution");
const Stat = require("../db/models/stat");
const router = require("express").Router();
const { requireToken } = require("./authMiddleware");
const { Op } = require("sequelize");

//GET /api/issues
router.get("/", async (req, res, next) => {
  try {
    const issues = await Issue.findAll({
      where: {
        isResolved: false,
      },
    });
    res.json(issues);
  } catch (error) {
    next(error);
  }
});

// GET /api/issues/myIssues
router.get("/myIssues", requireToken, async (req, res, next) => {
  try {
    const issues = await Issue.findAll({
      where: {
        userId: req.user.id,
      },
    });
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

// PUT /api/issues/:issueId/edit
router.put("/:issueId/edit", requireToken, async (req, res, next) => {
  try {
    const issue = await Issue.findOne({
      where: {
        userId: req.user.id,
        id: req.params.issueId,
      },
    });
    const updatedIssue = issue.update(req.body);
    res.json(updatedIssue);
  } catch (error) {
    next(error);
  }
});

// PUT /api/issues/:issueId
router.put("/:issueId", requireToken, async (req, res, next) => {
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
router.post("/", requireToken, async (req, res, next) => {
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
    stats.totalEscrow += Number(price);
    await stats.save();
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

// PUT api/issues/:issueId/solutions
router.put("/:issueId/solutions", async (req, res, next) => {
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

// GET /api/issues/:issueId/solutions/:solutionId
router.get(
  "/:issueId/solutions/:solutionId",
  requireToken,
  async (req, res, next) => {
    try {
      const solution = await Solution.findByPk(req.params.solutionId);
      res.json(solution);
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/issues/:issueId/solutions/:solutionId
router.put(
  "/:issueId/solutions/:solutionId",
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

// GET /api/issues/:issueId/solutions/:solutionId
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

// POST /api/issues/issueId/solutions
router.post("/:issueId/solutions", requireToken, async (req, res, next) => {
  try {
    const solution = await Solution.findOne({
      where: {
        userId: req.user.id,
        issueId: req.params.issueId,
      },
    });
    const stats = await Stat.findOne({
      where: {
        userId: req.user.id,
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
      stats.solutionsAttempted += 1;
      await stats.save();
      res.json(newSolution);
    }
  } catch (error) {
    next(error);
  }
});

//GET /api/issues/solutions/accepted
router.get("/solutions/accepted", requireToken, async (req, res, next) => {
  //finds all accepted solutions
  try {
    const solution = await Solution.findAll({
      where: {
        userId: req.user.id,
        isAccepted: true,
      },
      include: [Issue],
      //grabs the price of the attached issue.
    });
    res.json(solution);
  } catch (error) {
    next(error);
  }
});

// if issue is accepted, the payment is paid out(negative price for the issue poster)
// if issue is unresolved, the payment is pending in escrow.
// if solution is accepted, price is recieved.

module.exports = router;
