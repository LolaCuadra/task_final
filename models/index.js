const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.theme = require('./theme.js')(mongoose);
db.user = require('./user.js')(mongoose);
db.task = require('./task.js')(mongoose);
db.team = require('./teams.js')(mongoose);

module.exports = db;