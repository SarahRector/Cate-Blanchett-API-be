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
  });
