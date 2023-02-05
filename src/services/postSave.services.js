const { urlData, Companies } = require('../../database/models');

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

const addNewCompanyInDB = async (id) => {
    const data = await fetch(`http://54.167.46.10/company/${id}`).then(resp => resp.json());


    await Companies.findOrCreate({
        where: {
            company_id: data.id
        },
        defaults: {
            company_id: data.id,
            name: data.name,
            description: data.description,
            ceo: data.ceo,
            tags: data.tags
        }
    });

};

const addCompanyScoresInDB = async (sector) => {
    const data = await fetch(`http://54.167.46.10/sector?name=${sector}`).then(res => res.json());

    for (let idx = 0; idx < data.length; idx++) {
        const cpi = data[idx].performanceIndex[0].value,
            cf = data[idx].performanceIndex[1].value,
            mau = data[idx].performanceIndex[2].value,
            roic = data[idx].performanceIndex[3].value,
            score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;

        await Companies.update({
            cpi: data[idx].performanceIndex[0].value,
            cf: data[idx].performanceIndex[1].value,
            mau: data[idx].performanceIndex[2].value,
            roic: data[idx].performanceIndex[3].value,
            score: score,
            sector: sector
        }, {
            where: {
                company_id: data[idx].companyId
            }
        });
    }
};

const getHttpResponeData = async (id) => {
    const data = [];

    for (let idx = 0; idx < id.length; idx++) {
        const company = await Companies.findAll({
            raw: true,
            where: {
                company_id: id[idx]
            },
            attributes: ['company_id', 'name', 'score']
        });
        data.push(company);
    }

    return data;

};
module.exports = { checkForNewUrlData, addNewCompanyInDB, addCompanyScoresInDB, getHttpResponeData };