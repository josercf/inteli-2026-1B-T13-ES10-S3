const request = require('supertest');
const { createApp } = require('../src/app');
const db = require('../src/db');

let app;

beforeEach(() => {
  db.reset();
  db.getDb();
  app = createApp();
});

afterAll(() => {
  db.reset();
});

describe('health', () => {
  test('retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBe('ready');
  });
});

describe('courses', () => {
  beforeEach(() => db.seed());

  test('lista cursos do seed', async () => {
    const res = await request(app).get('/courses');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  test('enrollment-count devolve quantidade por curso', async () => {
    const res = await request(app).get('/courses/1/enrollment-count');
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
  });
});
