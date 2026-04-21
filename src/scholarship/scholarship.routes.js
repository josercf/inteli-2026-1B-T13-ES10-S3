const express = require('express');
const { calc } = require('./scholarship.service');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const result = calc(id);
  res.json(result);
});

module.exports = router;
