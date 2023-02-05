const Joi = require('joi');

const postSaveSchema = Joi.object({
    urlLink: Joi.string().required().regex(/https:\/\/store-[0-9]+\.s3\.amazonaws\.com\/[a-zA-z]+[0-9]*\.csv/)
}).required();

const updateCompanyDetailsSchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
}).required().min(1);

const rankingSchema = Joi.object({
    sector: Joi.string()
}).required();

module.exports = { postSaveSchema, updateCompanyDetailsSchema, rankingSchema};