const { Sectors, Companies, Scores } = require('../../database/models');

const getCompanyDataFromDB = async (id) => {
    const data = await Companies.findAll({
        where: {
            company_id: id
        }
    });
    console.log(data);
    return data;    
};

module.exports = {getCompanyDataFromDB};