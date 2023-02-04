const validatorMiddleware = require('../../src/middleware/validator.middleware');

describe('validatorMiddleware', () => {

    describe('bodyValidator', () => {

        it('should return http message 406 with error message when urlLink is not valid', async () => {

            const mockReq = {
                body: {
                    urlLink: 'http://www.something.com'
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockNext = jest.fn();
            await validatorMiddleware.bodyValidator(validatorMiddleware.postSaveSchema)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toBeCalledWith(406);
            expect(mockRes.json).toBeCalledWith({ message: '"urlLink" with value "http://www.something.com" fails to match the required pattern: /https:\\/\\/store-[0-9]+\\.s3\\.amazonaws\\.com\\/[a-zA-z]+[0-9]*\\.csv/' });
        });

        it('should call next() when urlLink is valid', async () => {

            const mockReq = {
                body: {
                    urlLink: 'https://store-1.s3.amazonaws.com/input.csv'
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockNext = jest.fn();

            await validatorMiddleware.bodyValidator(validatorMiddleware.postSaveSchema)(mockReq, mockRes, mockNext);

            expect(mockNext).toBeCalled();
        });
    }
    );
});
