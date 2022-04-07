const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/current-user', userController.getCurrentUser);
router.get('/:userId', userController.getUser);

module.exports = router;
