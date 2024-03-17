const db = require('../models');
const Team = db.team;

// Create a new team
exports.createTeam = (req, res) => {
  try {
    const { name, description, members } = req.body;

    if (!name || !description || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).send({ message: 'Invalid team data' });
    }

    const newTeam = new Team({
      name,
      description,
      members,
    });

    newTeam.save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error creating team',
        });
      });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error creating team' });
  }
};

// Get team details by ID
exports.getTeamById = (req, res) => {
  const teamId = req.params.teamId;

  Team.findById(teamId)
    .then((team) => {
      if (!team) {
        return res.status(404).send({ message: 'Team not found' });
      }
      res.send(team);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error retrieving team' });
    });
};

// Update team details
exports.updateTeam = (req, res) => {
  const teamId = req.params.teamId;

  Team.findByIdAndUpdate(teamId, req.body, { new: true })
    .then((updatedTeam) => {
      if (!updatedTeam) {
        return res.status(404).send({ message: 'Team not found' });
      }
      res.send(updatedTeam);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error updating team' });
    });
};

// Delete team by ID
exports.deleteTeam = (req, res) => {
  const teamId = req.params.teamId;

  Team.findByIdAndDelete(teamId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error deleting team' });
    });
};
