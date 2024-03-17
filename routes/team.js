const express = require('express');
const router = express.Router();

const teamController = require('../controllers/team');

router.get('/:teamId', teamController.getTeamById);
router.post('/', teamController.createTeam);
router.put('/:teamId', teamController.updateTeam);
router.delete('/:teamId', teamController.deleteTeam);

module.exports = router;
