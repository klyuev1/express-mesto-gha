const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

// router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
