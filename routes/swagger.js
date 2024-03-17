const router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDesign.json'); 
router.use('/callback', swaggerUi.serve);
router.get('/api-docs', requiresAuth(),swaggerUi.setup(swaggerDocument));

module.exports = router;
