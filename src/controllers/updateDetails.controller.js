const updateDetailsServices = require('../services/updateDetails.services');

const updateCompanyDetails = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    res.status(200).send(await updateDetailsServices.updateCompanyDetailsInDB(id, body));  
};

module.exports = {updateCompanyDetails};