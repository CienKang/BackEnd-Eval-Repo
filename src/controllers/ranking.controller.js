const rankingService = require('../../src/services/ranking.services');

const getRankings = async (req, res) => {
    const { sector } = req.query;
    const attributes = ['company_id', 'name', 'ceo', 'score'];
    const data = await rankingService.getSectorCompDataDB(attributes, sector);

    const newData = data.map((item, idx) => {
        return {...item.dataValues ,ranking : idx + 1 };
    });
    
    res.status(200).json({ sector: sector, data: newData });
};

module.exports = { getRankings };