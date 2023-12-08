const router = require('express').Router();
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../middlewares/userValidation');

const {
  getUsers,
  getUsersById,
  getUsersInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUsersInfo);
router.get('/users/:id', validateUserId, getUsersById);
router.patch('/users/me', validateUserInfo, updateUser);
router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
