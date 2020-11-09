const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Suit = require('../lib/models/Suit');

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

  it('finds all suits via GET', async() => {
    const suits = await Promise.all([
      Suit.insert({ color: 'yellow', designer: 'Fendi', image: 'test1.png' }),
      Suit.insert({ color: 'green velvet', designer: 'Designio', image: 'test2.png' }),
      Suit.insert({ color: 'purple', designer: 'Much Fashion', image: 'test3.png' }),
    ]);

    return request(app)
      .get('/api/v1/suits')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(suits));
      });
  });

  // it('deletes a suit via DELETE', async() => {
  //   const expectation = {};

  //   await request(app)
  //     .delete('/api/v1/suits/1');

  //   const data = await request(app)
  //     .get('/api/v1/suits/1');

  //   expect(data.body).toEqual(expectation);
  // });

  // it('gets a suit by id via GET', async() => {
  //   const expected = {
  //     id: '1',
  //     color: 'yellow',
  //     designer: 'Fendi',
  //     image: 'test1.png'
  //   };

  //   const data = await request(app)
  //     .get('/api/v1/suits/1');

  //   expect(data.body).toEqual(expected);
  // });

  // it('updates a suit by id via UPDATE', async() => {
  //   const suit = await Suit.insert({
  //     color: 'yellow',
  //     designer: 'Fendi',
  //     image: 'test1.png'
  //   });

  //   return request(app)
  //     .put(`/api/v1/suits/${suit.id}`)
  //     .send({
  //       color: 'green',
  //       designer: 'some guy',
  //       image: 'test2.png'
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         id: expect.any(String),
  //         color: 'green',
  //         designer: 'some guy',
  //         image: 'test2.png'
  //       });
  //     });
  // });
});
