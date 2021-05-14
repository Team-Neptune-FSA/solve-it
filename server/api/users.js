const router = require("express").Router();
const { User, Issue, Solution } = require("../db");
const { requireToken } = require("./authMiddleware");
module.exports = router;

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email", "problemsSolved", "solutionsAccepted"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/issues
router.get("/issues", requireToken, async (req, res, next) => {
  try {
    const issues = await Issue.findAll({
      where: {
        userId: req.user.id,
      },
      include: [{ model: Solution }],
    });
    res.json(issues);
  } catch (error) {
    next(error);
  }
});

//GET /api/users/solutions
router.get("/solutions", requireToken, async (req, res, next) => {
  try {
    const solutions = await Solution.findAll({
      where: {
        userId: req.user.id,
      },
      include: [{ model: Issue }],
    });
    res.json(solutions);
  } catch (error) {
    next(error);
  }
});
