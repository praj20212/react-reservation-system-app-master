const request = require('supertest');

const app = require('../server')


describe('detail', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/api/reservation/5a3be3ec7071851720db211a').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('all data', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/api/reservations').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});