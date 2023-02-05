const express = require('express');
const app = express.Router();

const schemas = require('../schemas/schema');
const middleware = require('../middleware/validator.middleware');
const updateDetailsController = require('../../src/controllers/updateDetails.controller');

app.route('/api/company/:id')
    .get(updateDetailsController.getAllCompanyDetails)
    .patch(middleware.bodyValidator(schemas.updateCompanyDetailsSchema), updateDetailsController.updateCompanyDetails);

module.exports = app;