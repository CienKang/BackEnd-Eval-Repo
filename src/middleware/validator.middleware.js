const Joi = require('joi');

const postSaveSchema = Joi.object({
    urlLink: Joi.string().required().regex(/https:\/\/store-[0-9]+\.s3\.amazonaws\.com\/[a-zA-z]+[0-9]*\.csv/)
}).required();

const bodyValidator = (schema) => {
    return (req, res, next) => {
        const body = req.body;
        const { error } = schema.validate(body);
        if (error) {
            res.status(406);
            res.json({ message: error.message });
        } else {
            next();
        }
    };
};
const updateCompanyDetailsSchema = Joi.object({
    ceo: Joi.string(),
    name: Joi.string()

}).required().min(1);

module.exports = { postSaveSchema, updateCompanyDetailsSchema, bodyValidator};