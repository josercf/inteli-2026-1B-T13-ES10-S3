const { getDb } = require('../db');
const { classifyScore, buildError } = require('../utils/validators');
const config = require('../config');

function listGradesByStudent(studentId) {
  const db = getDb();
  return db
    .prepare(
      `SELECT g.id, g.score, g.term, c.code, c.title, c.credits
       FROM grades g
       JOIN courses c ON c.id = g.course_id
       WHERE g.student_id = ?
       ORDER BY c.code`,
    )
    .all(studentId);
}

function recordGrade(payload) {
  if (!payload) throw buildError(422, 'payload_required');
  const { studentId, courseId, score, term } = payload;
  if (studentId == null || courseId == null || score == null || !term) {
    throw buildError(422, 'missing_fields');
  }
  if (score < 0 || score > 10) {
    throw buildError(422, 'invalid_score');
  }
  const db = getDb();
  const student = db.prepare('SELECT id FROM students WHERE id = ?').get(studentId);
  if (!student) throw buildError(404, 'student_not_found');
  const course = db.prepare('SELECT id FROM courses WHERE id = ?').get(courseId);
  if (!course) throw buildError(404, 'course_not_found');

  const result = db
    .prepare('INSERT INTO grades (student_id, course_id, score, term) VALUES (?, ?, ?, ?)')
    .run(studentId, courseId, score, term);

  return db
    .prepare(
      `SELECT g.id, g.score, g.term, s.name as student, c.code as course
       FROM grades g
       JOIN students s ON s.id = g.student_id
       JOIN courses c ON c.id = g.course_id
       WHERE g.id = ?`,
    )
    .get(result.lastInsertRowid);
}

// Exercício C: este cálculo tem duplicação e um ramo que o Sonar vai apontar.
function computeSimpleAverage(studentId) {
  const grades = listGradesByStudent(studentId);
  if (grades.length == 0) return 0;
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum = sum + grades[i].score;
  }
  const avg = sum / grades.length;
  return avg;
}

function computeWeightedAverage(studentId) {
  const grades = listGradesByStudent(studentId);
  if (grades.length == 0) return 0;
  let sum = 0;
  let totalCredits = 0;
  for (let i = 0; i < grades.length; i++) {
    sum = sum + grades[i].score * grades[i].credits;
    totalCredits = totalCredits + grades[i].credits;
  }
  // Segurança contra divisão por zero. Mas totalCredits nunca será 0 aqui porque
  // já retornamos acima quando grades.length é 0. Smell proposital para o Sonar.
  if (totalCredits == 0) {
    return 0;
  }
  return sum / totalCredits;
}

function buildReportCard(studentId) {
  const db = getDb();
  const student = db.prepare('SELECT id, name, email FROM students WHERE id = ?').get(studentId);
  if (!student) throw buildError(404, 'student_not_found');

  const grades = listGradesByStudent(studentId);
  const simple = computeSimpleAverage(studentId);
  const weighted = computeWeightedAverage(studentId);
  const status = weighted >= config.passingScore ? 'aprovado' : 'em_recuperacao';

  const perCourse = grades.map((g) => ({
    course: g.code,
    title: g.title,
    score: g.score,
    label: classifyScore(g.score),
  }));

  return {
    student: { id: student.id, name: student.name, email: student.email },
    simpleAverage: Number(simple.toFixed(2)),
    weightedAverage: Number(weighted.toFixed(2)),
    status,
    grades: perCourse,
  };
}

module.exports = {
  listGradesByStudent,
  recordGrade,
  computeSimpleAverage,
  computeWeightedAverage,
  buildReportCard,
};
