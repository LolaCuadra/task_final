const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 8080; 
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDesign.json');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); 

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUEBASERURL
};

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Routes setup
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use(auth(config));
app.use('/', require('./routes'));

// Database connection
const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.error('Cannot connect to the database:', err);
    process.exit(1); // Exit the process with an error code
  });

// Login route
app.get('/login', (req, res) => {
  if (req.query && req.query.code) {
    res.redirect('https://task-cse341-final.onrender.com/api-docs');
  } else {
    res.status(500).send('Authentication failed');
  }
});

// Swagger UI setup
app.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).send('Something went wrong');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
