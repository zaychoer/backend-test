const express = require('express');
const routes = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.get('/me', authMiddleware, getProfile);

module.exports = routes;
