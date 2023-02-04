const saveServices = require('../../src/services/save.services');
const { Sectors, Companies, Scores } = require('../../database/models');

describe('saveServices', () => {

    describe('fetchDataCsv', () => {

        it('should return an empty 2D array when no new data is found', async () => {
            const mockFetchResolve = 'company_id,company_sector\n1,sector1\n2,sector2\n3,sector3';
            jest.spyOn(global, 'fetch').mockResolvedValue({ text: () => mockFetchResolve });


            const findAllMock = [{ company_id: 1, company_sector: 'sector1' }];
            jest.spyOn(Sectors, 'findAll').mockResolvedValue(findAllMock);

            const createMock = [{ company_id: 1, company_sector: 'sector1' },
                { company_id: 2, company_sector: 'sector2' },
                { company_id: 3, company_sector: 'sector3' }
            ];
            jest.spyOn(Sectors, 'create').mockResolvedValue(createMock);

            const mockReq = 'http://something.com';
            const mockRes = await saveServices.fetchDataCsv(mockReq);
            expect(mockRes).toEqual([[], []]);

        });

        it('should return a 2D array of id and sector when new data is found', async () => {
            const mockFetchResolve = 'company_id,company_sector\n1,sector1\n2,sector2\n3,sector3';
            jest.spyOn(global, 'fetch').mockResolvedValue({ text: () => mockFetchResolve });

            const findAllMock = [];
            jest.spyOn(Sectors, 'findAll').mockResolvedValue(findAllMock);

            const createMock = [{ company_id: 1, company_sector: 'sector1' },
                { company_id: 2, company_sector: 'sector2' },
                { company_id: 3, company_sector: 'sector3' }
            ];

            jest.spyOn(Sectors, 'create').mockResolvedValue(createMock);

            const mockReq = 'http://something.com';
            const mockRes = await saveServices.fetchDataCsv(mockReq);
            expect(mockRes).toEqual([['1', '2', '3'], ['sector1', 'sector2', 'sector3']]);

        });
    });

    describe('getCompanyDataFromId', () => {

        it('should create a database in Companies table when no data is found', async () => {
            const mockFetchResolve = { id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 };
            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetchResolve });

            const findAllMock = [];
            jest.spyOn(Companies, 'findAll').mockResolvedValue(findAllMock);

            const createMock = { company_id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 };
            jest.spyOn(Companies, 'create').mockResolvedValue(createMock);

            const mockReq = 'http://something.com';
            const mockRes = await saveServices.getCompanyDataFromId(mockReq);
            expect(mockRes).toEqual(undefined);

        });

        it('should not create a database in Companies table when data is found', async () => {
            const mockFetchResolve = { id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 };
            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetchResolve });

            const findAllMock = [{ company_id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 }];
            jest.spyOn(Companies, 'findAll').mockResolvedValue(findAllMock);

            const mockReq = 'http://something.com';
            const mockRes = await saveServices.getCompanyDataFromId(mockReq);
            expect(mockRes).toEqual(undefined);
        });

    });

    describe('getCompanyScoreFromSector', () => {

        it('should create a database in Scores table when new data is found', async () => {
            const mockFetchResolve = [{
                companyId: 1, performanceIndex: [
                    { sector: 'sector1', score: 1 },
                    { sector: 'sector2', score: 2 },
                    { sector: 'sector3', score: 3 },
                    { sector: 'sector4', score: 4 }
                ]
            }];

            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetchResolve });

            const findAllMock = [];
            jest.spyOn(Scores, 'findAll').mockResolvedValue(findAllMock);

            const createMock = { company_id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 };
            jest.spyOn(Scores, 'create').mockResolvedValue(createMock);

            const mockSectorReq = 'sector';
            const mockArrayReq = [];
            const mockRes = await saveServices.getCompanyScoreFromSector(mockSectorReq, mockArrayReq);
            expect(mockRes).toEqual(undefined);

        });

        it('should not create a database in Scores table when no new data is found', async () => {
            const mockFetchResolve = [{
                companyId: 1, performanceIndex: [
                    { sector: 'sector1', score: 1 },
                    { sector: 'sector2', score: 2 },
                    { sector: 'sector3', score: 3 },
                    { sector: 'sector4', score: 4 }
                ]
            }];

            jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockFetchResolve });

            const findAllMock = [{ company_id: 1, name: 'name', tags: 'tags', ceo: 'ceo', numberEmployees: 1 }];
            jest.spyOn(Scores, 'findAll').mockResolvedValue(findAllMock);

            const mockSectorReq = 'sector';
            const mockArrayReq = [];
            const mockRes = await saveServices.getCompanyScoreFromSector(mockSectorReq, mockArrayReq);
            expect(mockRes).toEqual(undefined);

        });
    });

});