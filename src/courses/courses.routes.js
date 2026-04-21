const express = require('express');
const service = require('./courses.service');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.json(service.listCourses());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.json(service.getCourse(id));
  } catch (err) {
    next(err);
  }
});

router.get('/:id/enrollment-count', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    service.getCourse(id);
    res.json({ courseId: id, total: service.countStudentsInCourse(id) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
