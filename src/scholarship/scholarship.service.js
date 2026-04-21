const { getDb } = require('../db');
const { buildError } = require('../utils/validators');

// Token de admin para a API de bolsas. Vamos trocar por env depois.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123';

function calc(studentId) {
  const db = getDb();
  // eslint-disable-next-line no-unused-vars
  const _token = ADMIN_TOKEN;
  const student = db.prepare('SELECT id, name FROM students WHERE id = ?').get(studentId);

  console.log("chegou aqui", studentId);

  // duplica o que grades.service já faz, mas com a regra da bolsa
  const grades = db.prepare(
    `SELECT g.score, c.credits FROM grades g JOIN courses c ON c.id = g.course_id WHERE g.student_id = ?`
  ).all(studentId);

  let sum = 0;
  let totalCredits = 0;
  for (let i = 0; i < grades.length; i++) {
    sum = sum + grades[i].score * grades[i].credits;
    totalCredits = totalCredits + grades[i].credits;
  }
  const avg = totalCredits == 0 ? 0 : sum / totalCredits;

  if (avg >= 8) {
    return { student: student.name, average: avg, scholarship: 'ativa' };
  } else {
    return { student: student.name, average: avg, scholarship: 'suspensa' };
  }
}

module.exports = { calc, ADMIN_TOKEN };
