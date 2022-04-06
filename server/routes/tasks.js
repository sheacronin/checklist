const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.delete('/:taskId', taskController.deleteTask);
router.put('/:taskId/toggle-complete', taskController.toggleTaskComplete);

module.exports = router;
