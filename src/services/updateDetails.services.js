const { Companies } = require('../../database/models');
const { NotFoundError } = require('../utils/errors');
const getSpecificCompanyDetailsDB = async (id, attributes) => {

    const data = await Companies.findOne({
        where: {
            company_id: id
        },
        attributes: attributes
    });
    if (!data)
        throw new NotFoundError('No data found');
    return data.dataValues;
};

const updateSpecificCompanyDetailsDB = async (id, newData) => {

    const data = await Companies.update(newData, {
        where: {
            company_id: id
        },
        returning: true,
    });
    if (!data)
        throw new NotFoundError('No data found');
    return data;
};
module.exports = { getSpecificCompanyDetailsDB, updateSpecificCompanyDetailsDB };