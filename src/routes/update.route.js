const express = require('express');
const updateDetailsController = require('../controllers/updateDetails.controller');
const MiddleWare = require('../middleware/validator.middleware');
const app = express.Router();


app.patch('/api/companies/:id',MiddleWare.bodyValidator(MiddleWare.updateCompanyDetailsSchema), updateDetailsController.updateCompanyDetails);

module.exports = app;