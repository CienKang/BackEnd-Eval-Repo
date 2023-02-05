const rankingService = require('../../src/services/ranking.services');
const rankingController = require('../../src/controllers/ranking.controller');
const { NotFoundError } = require('../../src/utils/errors');

describe('Ranking Controller', () => {

    describe('getRankings', () => {

        it('should return 200 status code and data', async () => {
            const req = {
                query: {
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const data = [
                {
                    'dataValues': {
                        company_id: 1,
                        name: 'name',
                        ceo: 'ceo',
                        score: 'score'
                    }
                }

            ];
            jest.spyOn(rankingService, 'getSectorCompDataDB').mockReturnValue(data);
            await rankingController.getRankings(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                sector: 'sector',
                data: [{
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score',
                    ranking: 1
                }]
            });
        });

        it('should return 404 status code and message', async () => {
            const req = {
                query: {
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(rankingService, 'getSectorCompDataDB').mockRejectedValue(new NotFoundError('No data found', 404));
            await rankingController.getRankings(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({
                message: 'No data found'
            });
        });

        it('should return 500 status code and message', async () => {
            const req = {
                query: {
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.spyOn(rankingService, 'getSectorCompDataDB').mockRejectedValue(new Error('Error', 500));
            await rankingController.getRankings(req, res);
            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({
                message: 'Error'
            });
        });

    });

});