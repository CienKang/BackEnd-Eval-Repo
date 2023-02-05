const updateDetailsController = require('../../src/controllers/updateDetails.controller');
const updateDetailsServices = require('../../src/services/updateDetails.services');
const { NotFoundError } = require('../../src/utils/errors');

describe('Update Details Controller', () => {

    describe('getAllCompanyDetails', () => {

        it('should return 200 status code and data', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    attributes: ['name', 'ceo', 'sector']
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const data = [
                {
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score'
                }];

            jest.spyOn(updateDetailsServices, 'getSpecificCompanyDetailsDB').mockReturnValue(data);
            await updateDetailsController.getAllCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                data: [{
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score',
                }]
            });
        });

        it('should return 404 status code and message', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    attributes: ['name', 'ceo', 'sector']
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(updateDetailsServices, 'getSpecificCompanyDetailsDB').mockRejectedValue(new NotFoundError('No data found', 404));
            await updateDetailsController.getAllCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({
                message: 'No data found'
            });
        });

        it('should return 500 status code and message', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    attributes: ['name', 'ceo', 'sector']
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(updateDetailsServices, 'getSpecificCompanyDetailsDB').mockRejectedValue(new Error('Internal Server Error'));
            await updateDetailsController.getAllCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({
                message: 'Internal Server Error'
            });
        });
    });

    describe('updateCompanyDetails', () => {

        it('should return 201 status code and data', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    name: 'name',
                    ceo: 'ceo',
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const data = [
                {
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score'
                }];

            jest.spyOn(updateDetailsServices, 'updateSpecificCompanyDetailsDB').mockReturnValue(data);
            await updateDetailsController.updateCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                data: [{
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score',
                }]
            });
        });

        it('should return 404 status code and message', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    name: 'name',
                    ceo: 'ceo',
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(updateDetailsServices, 'updateSpecificCompanyDetailsDB').mockRejectedValue(new NotFoundError('No data found', 404));
            await updateDetailsController.updateCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({
                message: 'No data found'
            });
        });

        it('should return 500 status code and message', async () => {
            const req = {
                params: {
                    id: 1
                },
                body: {
                    name: 'name',
                    ceo: 'ceo',
                    sector: 'sector'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(updateDetailsServices, 'updateSpecificCompanyDetailsDB').mockRejectedValue(new Error('Internal Server Error'));
            await updateDetailsController.updateCompanyDetails(req, res);
            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({
                message: 'Internal Server Error'
            });
        });
    });
});
