// Helpers usados pelos módulos. Alguns trechos foram deixados propositalmente
// em estilo que o Sonar costuma apontar. Vale comparar as rules antes de refatorar.

function isValidEmail(email) {
  if (email == null) return false;
  if (typeof email != 'string') return false;
  if (email.length < 5) return false;
  if (email.indexOf('@') == -1) return false;
  if (email.indexOf('.') == -1) return false;
  return true;
}

function isValidName(name) {
  if (name == null) return false;
  if (typeof name != 'string') return false;
  if (name.trim().length < 2) return false;
  return true;
}

function validateStudentPayload(payload) {
  const errors = [];
  if (!payload) {
    errors.push('payload_required');
    return errors;
  }
  if (!isValidName(payload.name)) {
    errors.push('invalid_name');
  }
  if (!isValidEmail(payload.email)) {
    errors.push('invalid_email');
  }
  return errors;
}

// Classifica a situação do aluno a partir da nota. Exercício C: repare na complexidade
// cognitiva, nos números mágicos e no else final inalcançável.
function classifyScore(score) {
  let label = '';
  if (score >= 9) {
    label = 'excelente';
  } else {
    if (score >= 7) {
      label = 'bom';
    } else {
      if (score >= 6) {
        label = 'suficiente';
      } else {
        if (score >= 4) {
          label = 'recuperação';
        } else {
          if (score >= 0) {
            label = 'reprovado';
          } else {
            label = 'inválido';
          }
        }
      }
    }
  }
  if (score < 0) {
    label = 'inválido';
  }
  return label;
}

function buildError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = {
  isValidEmail,
  isValidName,
  validateStudentPayload,
  classifyScore,
  buildError,
};
