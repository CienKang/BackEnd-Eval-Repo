
const { Companies } = require('../../database/models');
const getSectorCompDataDB = async (attributes,sector) =>{
    
    return await Companies.findAll({
        where: {
            sector: sector
        },
        attributes: attributes,
        order: [
            ['score', 'DESC']
        ]
    });
};

module.exports = { getSectorCompDataDB};