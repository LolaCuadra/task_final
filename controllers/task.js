// task.js

const db = require('../models');
const Task = db.task;

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
    });

    const savedTask = await newTask.save();
    res.status(201).send(savedTask);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error creating task' });
  }
};

// Get task details by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error retrieving task' });
  }
};

// Update task details
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(updatedTask);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error updating task' });
  }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error deleting task' });
  }
};