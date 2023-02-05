const { Companies } = require('../../database/models');
const getSpecificCompanyDetailsDB = async (id, attributes) => {

    const { data, error } = await Companies.findOne({
        where: {
            company_id: id
        },
        attributes: attributes
    });
    console.log(error);
    return data.dataValues;
};

const updateSpecificCompanyDetailsDB = async (id, newData) => {

    const { data, error } = await Companies.update(newData, {
        where: {
            company_id: id
        },
        returning: true,
    });
    console.log(error);
    return data;
};
module.exports = { getSpecificCompanyDetailsDB, updateSpecificCompanyDetailsDB };