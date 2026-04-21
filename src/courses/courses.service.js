const { getDb } = require('../db');
const { buildError } = require('../utils/validators');

function listCourses() {
  const db = getDb();
  return db.prepare('SELECT id, code, title, credits FROM courses ORDER BY code').all();
}

function getCourse(id) {
  const db = getDb();
  const course = db.prepare('SELECT id, code, title, credits FROM courses WHERE id = ?').get(id);
  if (!course) {
    throw buildError(404, 'course_not_found');
  }
  return course;
}

function countStudentsInCourse(courseId) {
  const db = getDb();
  const row = db
    .prepare('SELECT COUNT(DISTINCT student_id) as total FROM grades WHERE course_id = ?')
    .get(courseId);
  return row.total;
}

module.exports = { listCourses, getCourse, countStudentsInCourse };
