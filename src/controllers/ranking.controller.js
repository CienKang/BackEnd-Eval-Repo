const rankingService = require('../../src/services/ranking.services');
const { NotFoundError } = require('../utils/errors');

const getRankings = async (req, res) => {
    const { sector } = req.query;
    const attributes = ['company_id', 'name', 'ceo', 'score'];
    try {
        const data = await rankingService.getSectorCompDataDB(attributes, sector);

        const newData = data.map((item, idx) => {
            return { ...item.dataValues, ranking: idx + 1 };
        });

        res.status(200).json({ sector: sector, data: newData });
    }
    catch (err) {
        if (err instanceof NotFoundError)
            res.status(404).json({ message: err.message });
        else
            res.status(500).json({ message: err.message });
    }
};

module.exports = { getRankings };