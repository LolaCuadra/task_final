module.exports = (mongoose) => {
    const Team = mongoose.model(
      'teams',
      mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        members: {
          type: [String],
          required: true,
        },
      })
    );
  
    return Team;
  };
  