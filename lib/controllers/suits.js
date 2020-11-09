const { Router } = require('express');
const Suit = require('../models/Suit');

module.exports = Router()
  .post('/', (req, res, next) => {
    Suit
      .insert(req.body)
      .then(suit => res.send(suit))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Suit
      .findAll()
      .then(suits => res.send(suits))
      .catch(next);
  })
  
  .delete('/api/v1/suits/:id', (req, res, next) => {
    Suit
      .delete(req.params.id)
      .then(suit => res.send(suit))
      .catch(next);
  })
  
  .get('/api/v1/suits/:id', (req, res, next) => {
    Suit
      .findById(req.params.id)
      .then(suit => res.send(suit))
      .catch(next);
  })
  
  .put('/api/v1/suits/:id', (req, res, next) => {
    Suit
      .update(req.params.id, req.body)
      .then(suit => res.send(suit))
      .catch(next);
  });
