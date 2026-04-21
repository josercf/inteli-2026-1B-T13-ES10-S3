const {
  isValidEmail,
  isValidName,
  validateStudentPayload,
  classifyScore,
} = require('../src/utils/validators');

describe('validators', () => {
  test('email válido passa', () => {
    expect(isValidEmail('teste@inteli.edu.br')).toBe(true);
  });

  test('email inválido falha', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail('foo')).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });

  test('nome válido passa', () => {
    expect(isValidName('Ana')).toBe(true);
    expect(isValidName('A')).toBe(false);
    expect(isValidName(null)).toBe(false);
  });

  test('payload sem campos gera lista de erros', () => {
    const errors = validateStudentPayload({});
    expect(errors).toContain('invalid_name');
    expect(errors).toContain('invalid_email');
  });

  test('payload nulo gera erro único', () => {
    expect(validateStudentPayload(null)).toEqual(['payload_required']);
  });

  test('classifyScore cobre as faixas principais', () => {
    expect(classifyScore(9.5)).toBe('excelente');
    expect(classifyScore(7)).toBe('bom');
    expect(classifyScore(6)).toBe('suficiente');
    expect(classifyScore(5)).toBe('recuperação');
    expect(classifyScore(2)).toBe('reprovado');
    expect(classifyScore(-1)).toBe('inválido');
  });
});
