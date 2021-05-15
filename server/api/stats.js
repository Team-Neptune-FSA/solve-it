const router = require("express").Router();
const { User, Issue, Solution, Stat } = require("../db");
const { requireToken } = require("./authMiddleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const stats = await Stat.findAll();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});
