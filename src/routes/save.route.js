const express = require('express');
const app = express.Router();

const schemas = require('../schemas/schema');
const middleware = require('../middleware/validator.middleware');
const postSaveController = require('../controllers/postSave.controller');

app.post('/api/save', middleware.bodyValidator(schemas.postSaveSchema), postSaveController.postSave);

module.exports = app;