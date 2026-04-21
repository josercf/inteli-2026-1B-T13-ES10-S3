const express = require('express');
const db = require('./db');
const studentsRouter = require('./students/students.routes');
const coursesRouter = require('./courses/courses.routes');
const gradesRouter = require('./grades/grades.routes');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', database: db.isReady() ? 'ready' : 'not ready' });
  });

  app.use('/students', studentsRouter);
  app.use('/courses', coursesRouter);
  app.use('/grades', gradesRouter);

  app.use((err, req, res, _next) => {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  });

  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  const app = createApp();
  db.seed();
  app.listen(port, () => {
    console.log(`academic-tracker escutando em http://localhost:${port}`);
  });
}

module.exports = { createApp };
