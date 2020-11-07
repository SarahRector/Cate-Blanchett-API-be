const { Router } = require('express');
const Suit = require('../models/Suit');

module.exports = Router()
  .post('/', (req, res, next) => {
    Suit
      .insert(req.body)
      .then(suit => res.send(suit))
      .catch(next);
  });
