const Question = require("../db/models/question");

const router = require("express").Router();

//GET /api/questions
router.get("/", async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

// GET /api/questions/:questionId
// router.get("/:questionId", async (req, res, next) => {
// 	try {
// 		const question = await Question.findByPk(req.params.questionId);
// 		res.json(question);
// 	} catch (error) {
// 		next(error);
// 	}
// });

module.exports = router;
