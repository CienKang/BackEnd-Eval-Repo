const util = require('../../src/utils/csvToJson');

describe('utils', () => {
    describe('csvToJson', () => {
        it('should return an array of objects', () => {
            const csv = 'company_id,company_sector\n1,sector1\n2,sector2';
            const result = util(csv);
            expect(result).toEqual([{ company_id: '1', company_sector: 'sector1' }, { company_id: '2', company_sector: 'sector2' }]);
        });
    });
});