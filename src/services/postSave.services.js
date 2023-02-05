const { urlData } = require('../../database/models');

const checkForNewUrlData = async (data) => {

    let id = [], sector = [];

    for (let idx = 0; idx < data.length; idx++) {
        const [user, created] = await urlData.findOrCreate({
            where: {
                company_id: data[idx].company_id
            }
            ,
            defaults: {
                company_id: data[idx].company_id,
                company_sector: data[idx].company_sector
            }
        });

        if (created === true) {
            id.push(user.company_id);
            sector.push(user.company_sector);
        }
    }

    return [id, sector];
};


module.exports = { checkForNewUrlData };