
const { Companies } = require('../../database/models');
const { NotFoundError } = require('../utils/errors');
const getSectorCompDataDB = async (attributes, sector) => {

    const data = await Companies.findAll({
        where: {
            sector: sector
        },
        attributes: attributes,
        order: [
            ['score', 'DESC']
        ]
    });
    if (!data)
        throw new NotFoundError('No data found');
    return data;
};

module.exports = { getSectorCompDataDB };