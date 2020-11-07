const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
//const Suit = require('../lib/models/Suit');

describe('Cate-Blanchett-API-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a suit via POST', () => {
    return request(app)
      .post('/api/v1/suits')
      .send({
        color: 'green',
        designer: 'Fendi',
        image: 'test.url'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          color: 'green',
          designer: 'Fendi',
          image: 'test.url'
        });
      });
  });
});
