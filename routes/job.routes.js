const express = require('express');
const routes = express.Router();

const { authMiddleware } = require('../middlewares/auth.middleware');
const {
  getAllJobs,
  getJobById,
} = require('../controllers/job.controller');

routes.get('', getAllJobs);
routes.get('/:id', authMiddleware, getJobById);

module.exports = routes;
