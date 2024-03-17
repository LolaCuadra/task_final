module.exports = (mongoose) => {
    const Task = mongoose.model(
      'tasks',
      mongoose.Schema({
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        assignedTo: {
          type: String,
          required: true,
        },
        dueDate: {
          type: Date,
          required: true,
        },
      })
    );
  
    return Task;
  };
  