const authRoutes = require('express').Router();
const authControler = require('../controllers/authControllers');

authRoutes.post('/sign-up', authControler.signup);
authRoutes.post('/sign-in', authControler.signin);

module.exports = authRoutes;