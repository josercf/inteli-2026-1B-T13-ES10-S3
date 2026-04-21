const express = require('express');
const service = require('./students.service');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.json(service.listStudents());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.json(service.getStudent(id));
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    const created = service.createStudent(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
