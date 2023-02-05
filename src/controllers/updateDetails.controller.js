const updateDetailsServices = require('../services/updateDetails.services');
const { NotFoundError } = require('../utils/errors');

const getAllCompanyDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await updateDetailsServices.getSpecificCompanyDetailsDB(id, req.body.attributes);
        res.status(200).json({ data: data });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            res.status(404).json({ message: err.message });
        else
            res.status(500).json({ message: err.message });
    }

};

const updateCompanyDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await updateDetailsServices.updateSpecificCompanyDetailsDB(id, req.body);
        res.status(201).json({ data: data });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            res.status(404).json({ message: err.message });
        else
            res.status(500).json({ message: err.message });
    }
};
module.exports = {
    getAllCompanyDetails,
    updateCompanyDetails
};