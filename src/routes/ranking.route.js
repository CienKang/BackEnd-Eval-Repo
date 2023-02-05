const express = require('express');
const app = express.Router();

const schemas = require('../schemas/schema');
const middleware = require('../middleware/validator.middleware');
const rankingController = require('../controllers/ranking.controller');

app.get('/api/companies', middleware.queryValidator(schemas.rankingSchema), rankingController.getRankings);

module.exports = app;