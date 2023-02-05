const { urlData, Companies } = require('../../database/models');
const postSaveServices = require('../../src/services/postSave.services');

describe('postSave.services', () => {

    describe('checkForNewUrlData', () => {

        it('should return a 2D array when new data is found', async () => {
            const mockData = [
                {
                    company_id: 1,
                    company_sector: 'sector1'
                }
            ];

            const mockFindOrCreate = [{ company_id: 1, company_sector: 'sector1' }, true];
            jest.spyOn(urlData, 'findOrCreate').mockResolvedValue(mockFindOrCreate);

            const result = await postSaveServices.checkForNewUrlData(mockData);
            expect(result).toEqual([[1], ['sector1']]);
        });


        it('should return a empty 2D array when no new data is found', async () => {
            const mockData = [
                {
                    company_id: 1,
                    company_sector: 'sector1'
                }
            ];

            const mockFindOrCreate = [{}, false];
            jest.spyOn(urlData, 'findOrCreate').mockResolvedValue(mockFindOrCreate);

            const result = await postSaveServices.checkForNewUrlData(mockData);
            expect(result).toEqual([[], []]);
        });

    });

    describe('addNewCompanyInDB', () => {

        it('should add a new company in the database if it does not exist', async () => {
            const mockFetch = {
                company_id: 1,
                name: 'name',
                description: 'description',
                ceo: 'ceo',
                tags: 'tags'
            };
            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetch });

            const mockFindOrCreate = [mockFetch];
            jest.spyOn(Companies, 'findOrCreate').mockResolvedValue(mockFindOrCreate);
            await (postSaveServices.addNewCompanyInDB(1));

        });
    });

    describe('addCompanyScoresInDB', () => {

        it('should update the company scores in the database', async () => {
            const mockFetch = [{
                id: 1,
                performanceIndex: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }]
            }];

            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetch });

            const mockUpdate = [1];
            jest.spyOn(Companies, 'update').mockResolvedValue(mockUpdate);
            await (postSaveServices.addCompanyScoresInDB('sector'));
        });
    });

    describe('getHttpResponeData', () => {

        it('should return empty array when id sent was not present in the database', async () => {

            const mockFindAll = [];
            jest.spyOn(Companies, 'findAll').mockResolvedValue(mockFindAll);

            const result = await postSaveServices.getHttpResponeData([1, 2]);
            expect(result).toEqual([[], []]);
        });

        it('should return an array of objects when id sent was present in the database', async () => {

            const mockFindAll = {
                company_id: 1,
                name: 'name',
                score: 'score'
            };
            jest.spyOn(Companies, 'findAll').mockResolvedValue(mockFindAll);

            const result = await postSaveServices.getHttpResponeData([1]);
            expect(result).toEqual([mockFindAll]);
        });
    });

});