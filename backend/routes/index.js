const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const {
  createUser, login,
} = require('../controllers/users');
const {
  createUserValidation, loginValidation,
} = require('../validation/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
