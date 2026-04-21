const { getDb } = require('../db');
const { validateStudentPayload, buildError } = require('../utils/validators');

function listStudents() {
  const db = getDb();
  return db.prepare('SELECT id, name, email, enrolled_at FROM students ORDER BY id').all();
}

function getStudent(id) {
  const db = getDb();
  const student = db
    .prepare('SELECT id, name, email, enrolled_at FROM students WHERE id = ?')
    .get(id);
  if (!student) {
    throw buildError(404, 'student_not_found');
  }
  return student;
}

function createStudent(payload) {
  const errors = validateStudentPayload(payload);
  if (errors.length > 0) {
    throw buildError(422, errors.join(','));
  }

  const db = getDb();
  try {
    const result = db
      .prepare('INSERT INTO students (name, email) VALUES (?, ?)')
      .run(payload.name.trim(), payload.email.trim().toLowerCase());
    return getStudent(result.lastInsertRowid);
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw buildError(409, 'email_already_exists');
    }
    throw err;
  }
}

module.exports = { listStudents, getStudent, createStudent };
