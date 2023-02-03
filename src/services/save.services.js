const csvJSON = require('../utils/csvToJson');
const { Sectors, Companies, Scores } = require('../../database/models');
const dbService = require('./db.services');

const fetchDataCsv = async (url) => {
    const res = await fetch(url).then(response => response.text());
    const data = csvJSON(res);

    let id = [], sector = [];
    for (let idx = 0; idx < data.length; idx++) {
        const result = await Sectors.findAll({
            where: {
                company_id: data[idx].company_id
            }
        });

        if (result.length === 0)
            await
            Sectors.create({
                company_id: data[idx].company_id,
                company_sector: data[idx].company_sector
            });

        id = [...id, data[idx].company_id];

        if (sector.indexOf(data[idx].company_sector) === -1)
            sector = [...sector, data[idx].company_sector];
    }

    return [id, sector];
};

const getCompanyDataFromId = async (id) => {
    const data = await fetch(`http://54.167.46.10/company/${id}`).then(response => response.json());

    const result = await Companies.findAll({
        where: {
            company_id: data.id
        }
    });

    if (result.length === 0)
        await Companies.create({
            company_id: data.id,
            name: data.name,
            tags: data.tags,
            ceo: data.ceo,
            numberEmployees: data.numberEmployees
        });
    return data;
};


const getCompanyScoreFromSector = async (sector) => {
    const data = await fetch(`http://54.167.46.10/sector?name=${sector}`).then(response => response.json());

    let returnData = [];
    for (let idx = 0; idx < data.length; idx++) {

        const cpi = Number(data[idx].performanceIndex[0].value),
            cf = Number(data[idx].performanceIndex[1].value),
            mau = Number(data[idx].performanceIndex[2].value),
            roic = Number(data[idx].performanceIndex[3].value),
            score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;

        const result = await Scores.findAll({
            where: {
                companyId: data[idx].companyId
            }
        });

        if (result.length == 0) {
            const postedData = await Scores.create({
                companyId: data[idx].companyId,
                cpi: cpi,
                cf: cf,
                mau: mau,
                roic: roic,
                score: score
            }, { returning: true }
            );
            console.log('Newly created',postedData.keys);
            // returnData = [...returnData, postedData];
        }
    }
    return returnData;
};


module.exports = { fetchDataCsv, getCompanyDataFromId, getCompanyScoreFromSector };