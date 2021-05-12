const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/execute', require('./execute'));
router.use('/issues', require('./issues'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
