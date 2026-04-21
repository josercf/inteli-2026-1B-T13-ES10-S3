const request = require('supertest');
const { createApp } = require('../src/app');
const db = require('../src/db');

let app;

beforeEach(() => {
  db.reset();
  db.getDb();
  db.seed();
  app = createApp();
});

afterAll(() => {
  db.reset();
});

describe('students', () => {
  test('lista alunos do seed', async () => {
    const res = await request(app).get('/students');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty('name');
  });

  test('retorna aluno por id', async () => {
    const res = await request(app).get('/students/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Ana Lima');
  });

  test('devolve 404 quando aluno não existe', async () => {
    const res = await request(app).get('/students/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('student_not_found');
  });

  test('cria aluno novo', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Daniel Rocha', email: 'daniel@inteli.edu.br' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeGreaterThan(3);
  });

  test('rejeita payload inválido', async () => {
    const res = await request(app).post('/students').send({ name: 'X', email: 'foo' });
    expect(res.status).toBe(422);
  });

  test('rejeita email duplicado', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Ana', email: 'ana@inteli.edu.br' });
    expect(res.status).toBe(409);
  });
});
