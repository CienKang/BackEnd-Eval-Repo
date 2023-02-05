const { csvToJSON } = require('../utils/csvToJson');
const postSaveServices = require('../../src/services/postSave.services');

const postSave = async (req, res) => {
    const url = req.body.urlLink;
    const csv = await fetch(url).then(res => res.text());
    const data = csvToJSON(csv);
    let [id, sector] = await postSaveServices.checkForNewUrlData(data);

    res.status(201).json({ id: id, sector: sector, message: 'Data saved successfully' });
};

module.exports = { postSave };