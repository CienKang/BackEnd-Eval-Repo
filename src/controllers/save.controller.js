const postSaveServices = require('../services/save.services');

const saveCompanyData = async (req, res) => {
    let newData = [];
    const { urlLink } = req.body;
    const [id, sector] = await postSaveServices.fetchDataCsv(urlLink);
    
    id.forEach(async (id) => {
        await postSaveServices.getCompanyDataFromId(id);
    });

    for(let i = 0; i < sector.length; i++)
        await postSaveServices.getCompanyScoreFromSector(sector[i],newData);
    
    if(newData.length == 0)
        res.status(200).json({message:'No new data saved',data:[]});
    res.status(200).json({message:'New data saved ',data:newData});
};

module.exports = { saveCompanyData };