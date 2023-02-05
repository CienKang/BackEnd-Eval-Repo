const updateDetailsServices = require('../services/updateDetails.services');

const getAllCompanyDetails = async (req, res) => {
    const { id } = req.params;

    const data = await updateDetailsServices.getSpecificCompanyDetailsDB(id, req.body.attributes);
    res.status(200).json({ data: data});

};

const updateCompanyDetails = async (req, res) => {
    const {id } = req.params;
    const data = await updateDetailsServices.updateSpecificCompanyDetailsDB(id, req.body);
    res.status(201).json({ data: data});
};
module.exports = {
    getAllCompanyDetails,
    updateCompanyDetails
};