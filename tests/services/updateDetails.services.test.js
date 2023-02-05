const { Companies } = require('../../database/models');
const { NotFoundError } = require('../../src/utils/errors');
const updateDetailsServices = require('../../src/services/updateDetails.services');

describe('Update Details Services', () => {

    describe('getSpecificCompanyDetailsDB', () => {

        it('should return data when found in db', async () => {
            const data = [{
                dataValues: {
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score'
                }
            }];
            const attributes = ['name', 'ceo', 'score'];
            jest.spyOn(Companies, 'findOne').mockReturnValue(data);
            const result = await updateDetailsServices.getSpecificCompanyDetailsDB(1, attributes);
            expect(result).toEqual(data.dataValues);
        });

        it('should throw error when data not found in db ', async () => {
            const attributes = ['name', 'ceo', 'score'];
            jest.spyOn(Companies, 'findOne').mockReturnValue(null);
            await expect(updateDetailsServices.getSpecificCompanyDetailsDB(1, attributes)).rejects.toThrow(NotFoundError);
        });
    });

    describe('updateSpecificCompanyDetailsDB', () => {

        it('should post new data and return data when data is present in DB', async () => {
            const data = [
                {
                    company_id: 1,
                    name: 'name',
                    ceo: 'ceo',
                    score: 'score'
                }];
            const newData = {
                name: 'name',
                ceo: 'ceo',
                score: 'score'
            };
            const id = 1;
            jest.spyOn(Companies, 'update').mockReturnValue(data);
            const result = await updateDetailsServices.updateSpecificCompanyDetailsDB(id, newData);
            expect(result).toEqual(data);
        });

        it('should throw error when data not found in db', async () => {
            const newData = {
                name: 'name',
                ceo: 'ceo',
                score: 'score'
            };
            const id = 1;
            jest.spyOn(Companies, 'update').mockReturnValue(null);
            await expect(updateDetailsServices.updateSpecificCompanyDetailsDB(id, newData)).rejects.toThrow(NotFoundError);
        });
    });
});