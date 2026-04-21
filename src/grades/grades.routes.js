const express = require('express');
const service = require('./grades.service');

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const created = service.recordGrade(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get('/student/:studentId', (req, res, next) => {
  try {
    const studentId = Number(req.params.studentId);
    res.json(service.listGradesByStudent(studentId));
  } catch (err) {
    next(err);
  }
});

router.get('/student/:studentId/report', (req, res, next) => {
  try {
    const studentId = Number(req.params.studentId);
    res.json(service.buildReportCard(studentId));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
