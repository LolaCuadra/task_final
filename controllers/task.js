const db = require('../models');
const Task = db.task;

// Create a new task
exports.createTask = (req, res) => {
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

    newTask.save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error creating task',
        });
      });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error creating task' });
  }
};

// Get task details by ID
exports.getTaskById = (req, res) => {
  const taskId = req.params.taskId;

  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error retrieving task' });
    });
};

// Update task details
exports.updateTask = (req, res) => {
  const taskId = req.params.taskId;

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.send(updatedTask);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error updating task' });
    });
};

// Delete task by ID
exports.deleteTask = (req, res) => {
  const taskId = req.params.taskId;

  Task.findByIdAndDelete(taskId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error deleting task' });
    });
};
