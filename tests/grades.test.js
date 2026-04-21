const request = require('supertest');
const { createApp } = require('../src/app');
const db = require('../src/db');
const {
  computeSimpleAverage,
  computeWeightedAverage,
  buildReportCard,
} = require('../src/grades/grades.service');

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

describe('grades service', () => {
  test('média simples do aluno 1 é 8.15', () => {
    expect(Number(computeSimpleAverage(1).toFixed(2))).toBe(8.15);
  });

  test('média ponderada do aluno 1 usa os créditos dos cursos', () => {
    const weighted = computeWeightedAverage(1);
    expect(weighted).toBeCloseTo(8.15, 2);
  });

  test('média de aluno sem notas devolve 0', () => {
    expect(computeSimpleAverage(999)).toBe(0);
    expect(computeWeightedAverage(999)).toBe(0);
  });

  test('boletim classifica aluno 3 como em recuperação', () => {
    const report = buildReportCard(3);
    expect(report.status).toBe('em_recuperacao');
    expect(report.grades[0].label).toBe('recuperação');
  });
});

describe('grades api', () => {
  test('lista notas do aluno', async () => {
    const res = await request(app).get('/grades/student/1');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('gera boletim do aluno', async () => {
    const res = await request(app).get('/grades/student/1/report');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('aprovado');
  });

  test('rejeita nota fora do intervalo', async () => {
    const res = await request(app)
      .post('/grades')
      .send({ studentId: 1, courseId: 1, score: 15, term: '2026.1' });
    expect(res.status).toBe(422);
  });

  test('devolve 404 para aluno inexistente', async () => {
    const res = await request(app)
      .post('/grades')
      .send({ studentId: 999, courseId: 1, score: 7, term: '2026.1' });
    expect(res.status).toBe(404);
  });

  test('cria nota válida', async () => {
    const res = await request(app)
      .post('/grades')
      .send({ studentId: 3, courseId: 1, score: 7.5, term: '2026.1' });
    expect(res.status).toBe(201);
    expect(res.body.course).toBe('ES10');
  });
});
