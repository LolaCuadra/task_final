// routes/index.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// Task routes
router.post('/task', taskController.createTask);
router.get('/task/:taskId', taskController.getTaskById);
router.put('/task/:taskId', taskController.updateTask);
router.delete('/task/:taskId', taskController.deleteTask);

module.exports = router;
