const postSaveServices = require('../services/save.services');

const saveCompanyData = async (req, res) => {
    let returnData = [];
    const { urlLink } = req.body;
    const [id, sector] = await postSaveServices.fetchDataCsv(urlLink);

    id.forEach(async (id) => {
        await postSaveServices.getCompanyDataFromId(id);
    });

    sector.forEach(async (sector) => {
        returnData = [...returnData, await postSaveServices.getCompanyScoreFromSector(sector)];
    });

    // console.log(returnData);
    if (returnData.length != 0)
        res.status(201).json({
            message: 'Data saved successfully',
            data: []
        });
    else res.status(200).json({
        message: 'Data already exists',
        data: []
    });
};

module.exports = { saveCompanyData };