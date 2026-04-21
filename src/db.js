const Database = require('better-sqlite3');

let db = null;

function getDb() {
  if (db) return db;
  db = new Database(':memory:');
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      enrolled_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      credits INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      score REAL NOT NULL,
      term TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `);
  return db;
}

function seed() {
  const database = getDb();
  const count = database.prepare('SELECT COUNT(*) as total FROM students').get();
  if (count.total > 0) return;

  const insertStudent = database.prepare('INSERT INTO students (name, email) VALUES (?, ?)');
  const insertCourse = database.prepare(
    'INSERT INTO courses (code, title, credits) VALUES (?, ?, ?)',
  );
  const insertGrade = database.prepare(
    'INSERT INTO grades (student_id, course_id, score, term) VALUES (?, ?, ?, ?)',
  );

  const seedTx = database.transaction(() => {
    insertStudent.run('Ana Lima', 'ana@inteli.edu.br');
    insertStudent.run('Bruno Sá', 'bruno@inteli.edu.br');
    insertStudent.run('Carla Dias', 'carla@inteli.edu.br');

    insertCourse.run('ES10', 'Engenharia de Software 10', 4);
    insertCourse.run('DS05', 'Arquitetura de Dados', 4);
    insertCourse.run('MA03', 'Matemática Aplicada', 2);

    insertGrade.run(1, 1, 8.5, '2026.1');
    insertGrade.run(1, 2, 7.8, '2026.1');
    insertGrade.run(2, 1, 6.2, '2026.1');
    insertGrade.run(2, 3, 9.0, '2026.1');
    insertGrade.run(3, 2, 5.4, '2026.1');
  });

  seedTx();
}

function isReady() {
  try {
    getDb().prepare('SELECT 1').get();
    return true;
  } catch (_err) {
    return false;
  }
}

function reset() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getDb, seed, isReady, reset };
