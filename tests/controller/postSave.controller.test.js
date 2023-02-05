const postSaveServices = require('../../src/services/postSave.services');
const postSaveControlller = require('../../src/controllers/postSave.controller');

describe('postSave controller', () => {
    describe('postSave', () => {

        it('should return 200 status code with message when no new data is found', async () => {
            const mockUrl = 'https://www.something.com';
            const mockCSV = 'company_id,company_sector\n1,sector1\n2,sector2\n3,sector3';
            jest.spyOn(global, 'fetch').mockResolvedValue({ text: () => mockCSV });

            jest.spyOn(postSaveServices, 'checkForNewUrlData').mockResolvedValue([[], []]);
            const req = { body: { urlLink: mockUrl } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await postSaveControlller.postSave(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'No new data found', data: [] });
        });

        it('should return 201 status code with message when new data is found', async () => {
            const mockUrl = 'https://www.something.com';
            const mockCSV = 'company_id,company_sector\n1,sector1\n2,sector2\n3,sector3';
            jest.spyOn(global, 'fetch').mockResolvedValue({ text: () => mockCSV });

            jest.spyOn(postSaveServices, 'checkForNewUrlData').mockResolvedValue([[1, 2, 3], ['sector1', 'sector2', 'sector3']]);
            jest.spyOn(postSaveServices, 'addNewCompanyInDB').mockResolvedValue();
            jest.spyOn(postSaveServices, 'addCompanyScoresInDB').mockResolvedValue();
            jest.spyOn(postSaveServices, 'getHttpResponeData').mockResolvedValue([{ company_id: 1, company_sector: 'sector1' }]);

            const req = { body: { urlLink: mockUrl } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await postSaveControlller.postSave(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Data added successfully', data: [{ company_id: 1, company_sector: 'sector1' }] });
        });

    });
});