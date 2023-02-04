const saveController = require('../../src/controllers/save.controller');
const postSaveServices = require('../../src/services/save.services');

describe('saveController', () => {
    describe('saveCompanyData', () => {

        it('should return http message 201 with data saved msg when new data is found', async () => {

            const fetchDataCsvResolvedValue = [[1, 2, 3], ['sector1', 'sector2']];

            jest.spyOn(postSaveServices, 'fetchDataCsv').mockResolvedValue(fetchDataCsvResolvedValue);
            jest.spyOn(postSaveServices, 'getCompanyDataFromId').mockResolvedValue({});
            jest.spyOn(postSaveServices, 'getCompanyScoreFromSector').mockResolvedValue({});

            const mockReq = {
                body: {
                    urlLink: 'http://www.something.com'
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await saveController.saveCompanyData(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'New data saved ', data: [] });
        });

        
        it('should return http message 200 with no data saved msg when no new data is found', async () => {

            const fetchDataCsvResolvedValue = [[], []];
            jest.spyOn(postSaveServices, 'fetchDataCsv').mockResolvedValue(fetchDataCsvResolvedValue);
            jest.spyOn(postSaveServices, 'getCompanyDataFromId').mockResolvedValue({});
            jest.spyOn(postSaveServices, 'getCompanyScoreFromSector').mockResolvedValue({});

            const mockReq = {
                body: {
                    urlLink: 'http://www.something.com'
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await saveController.saveCompanyData(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'No new data saved', data: [] });

        });
    });

});