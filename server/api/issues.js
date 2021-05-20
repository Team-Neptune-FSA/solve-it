const Issue = require("../db/models/issue");
const Solution = require("../db/models/solution");
const Stat = require("../db/models/stat");
const Question = require("../db/models/question");
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

//GET /api/issues/questions
router.get("/questions", requireToken, async (req, res, next) => {
  try {
    const issues = await Issue.findAll({
      where: {
        userId: req.user.id,
      },
      include: [{ model: Question, where: { answer: null } }],
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

//GET /api/issues/:issueId/questions
router.get("/:issueId/questions", requireToken, async (req, res, next) => {
  try {
    const issue = await Issue.findByPk(req.params.issueId);
    let questions;
    if (req.user.id === issue.userId) {
      questions = await Question.findAll({
        where: {
          issueId: req.params.issueId,
        },
      });
    } else {
      questions = await Question.findAll({
        where: {
          issueId: req.params.issueId,
          userId: req.user.id,
        },
      });
    }
    res.json(questions);
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
    await issue.setUser(req.user);
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

// PUT /api/issues/:issueId/question
router.post("/:issueId/question", requireToken, async (req, res, next) => {
  try {
    const { questionContent, answer } = req.body;
    const issue = await Issue.findByPk(req.params.issueId);
    const question = await Question.create({
      questionContent,
      answer,
    });
    await question.setUser(req.user);
    await question.setIssue(issue);
    res.json(question);
  } catch (error) {
    next(error);
  }
});

// PUT /api/issues/:issueId/answer
router.put("/:issueId/answer", requireToken, async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: {
        issueId: req.params.issueId,
        answer: null,
      },
    });
    const updatedQuestion = await questions[0].update(req.body);
    res.json(updatedQuestion);
  } catch (error) {
    next(error);
  }
});

// PUT /api/issues/:questionId/answer
router.put(
  "/questions/:questionId/answer",
  requireToken,
  async (req, res, next) => {
    try {
      const question = await Question.findOne({
        where: {
          id: req.params.questionId,
        },
      });
      const updatedQuestion = await question.update({
        ...question,
        answer: req.body.theAnswer,
      });
      res.json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  }
);

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

module.exports = router;
