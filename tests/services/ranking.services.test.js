const { Companies } = require('../../database/models');
const { NotFoundError } = require('../../src/utils/errors');
const rankingService = require('../../src/services/ranking.services');

describe('Ranking Service', () => {

    describe('getSectorCompDataDB', () => {

        it('should return data in descending order when data is found in db', async () => {

            const attributes = ['company_id', 'name', 'ceo', 'score'];
            const sector = 'sector';
            const mockData = [
                {
                    'dataValues': {
                        company_id: 1,
                        name: 'name',
                        ceo: 'ceo',
                        score: 'score'
                    }
                }]
            ;
            jest.spyOn(Companies, 'findAll').mockReturnValue(mockData);
            const result = await rankingService.getSectorCompDataDB(attributes, sector);
            expect(result).toEqual(mockData);
        });

        it('should throw error when data is not found in db', async () => {
            const attributes = ['company_id', 'name', 'ceo', 'score'];
            const sector = 'sector';
            jest.spyOn(Companies, 'findAll').mockReturnValue(null);
            await expect(rankingService.getSectorCompDataDB(attributes, sector)).rejects.toThrow(new NotFoundError('No data found'));
        });
    });
});