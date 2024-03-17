const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 8080;
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDesign.json'); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUEBASERURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// app.use('/api-docs', swaggerConfig);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
})
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

  app.get('/callback', (req, res) => {
    // Check if authentication was successful
    if (req.query && req.query.code) {
        // Authentication successful, redirect the user to the desired destination
        res.redirect('https://task-cse341-final.onrender.com/api-docs'); 
    } else {
        // Authentication failed or no code received
        res.status(500).send('Authentication failed');
    }
});