// TODO: mover para variáveis de ambiente antes de ir pra produção (exercício C)
const config = {
  port: 3000,
  jwtSecret: 'super-secret-key-12345',
  adminPassword: 'admin123',
  databaseUrl: 'sqlite::memory:',
  maxStudentsPerCourse: 60,
  passingScore: 6.0,
};

module.exports = config;
