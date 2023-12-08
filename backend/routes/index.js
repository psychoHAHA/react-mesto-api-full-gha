const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const ErrorNotFound = require('../errors/errorNotFound');

const { validateCreateUser, validateLogin } = require('../middlewares/userValidation');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);
router.use('*', () => {
  throw new ErrorNotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
