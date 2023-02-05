const { csvToJSON } = require('../utils/csvToJson');
const postSaveServices = require('../../src/services/postSave.services');

const postSave = async (req, res) => {
    const url = req.body.urlLink;
    const csv = await fetch(url).then(res => res.text());
    const data = csvToJSON(csv);
    let [id, sector] = await postSaveServices.checkForNewUrlData(data);
    sector = sector.filter((item, idx) => sector.indexOf(item) === idx);
    console.log(id, sector);

    if(id.length === 0 && sector.length === 0) 
    {
        res.status(200).json({message: 'No new data found', data: []});
        return;
    }

    for(let idx = 0; idx < id.length; idx++) {
        await postSaveServices.addNewCompanyInDB(id[idx]);
    }   

    for(let idx = 0; idx < sector.length; idx++) {
        await postSaveServices.addCompanyScoresInDB(sector[idx]);
    }
    const httpResponseData = await postSaveServices.getHttpResponeData(id);
    res.status(201).json({message: 'Data added successfully', data: httpResponseData});
};

module.exports = { postSave };