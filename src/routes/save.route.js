const express = require('express');
const postSaveController = require('../controllers/save.controller');
const MiddleWare = require('../middleware/validator.middleware');
const app = express.Router();



app.post('/api/save',MiddleWare.bodyValidator(MiddleWare.postSaveSchema),postSaveController.saveCompanyData);
    

module.exports = app;