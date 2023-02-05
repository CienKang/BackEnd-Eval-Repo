const middleware = require('../../src/middleware/validator.middleware');

describe('Validator Middleware', () => {

    describe('bodyValidator', () => {

        it('should return 400 when body is invalid', () => {
            const schema = {
                validate: jest.fn().mockReturnValue({ error: 'error' })
            };
            const req = {
                body: {
                    urlLink: 'https://s3.amazonaws.com/input.csv'
                }
            };
            const res = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const next = jest.fn();
            middleware.bodyValidator(schema)(req, res, next);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: 'error' });
        });

        it('should call next when body is valid', () => {
            const schema = {
                validate: jest.fn().mockReturnValue({ error: null })
            };
            const req = {
                body: {
                    urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
                }
            };
            const res = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const next = jest.fn();
            middleware.bodyValidator(schema)(req, res, next);
            expect(next).toBeCalled();
        });
    });

    describe('queryValidator', () => {

        it('should return 400 when query is invalid', () => {
            const schema = {
                validate: jest.fn().mockReturnValue({ error: 'error' })
            };
            const req = {
                query: {
                    ceo: 'Nadela'
                }
            };
            const res = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const next = jest.fn();
            middleware.queryValidator(schema)(req, res, next);
            expect(next).not.toBeCalled();
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({ message: 'error' });
        });

        it('should call next when query is valid', () => {
            const schema = {
                validate: jest.fn().mockReturnValue({ error: null })
            };
            const req = {
                query: {
                    ceo: 'Nadela'
                }
            };
            const res = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const next = jest.fn();
            middleware.queryValidator(schema)(req, res, next);
            expect(next).toBeCalled();
        });
    });
});