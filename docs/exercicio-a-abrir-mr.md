# Exercício A, abrir um Merge Request

## Papel

Você é o autor de um MR. Seu objetivo é entregar uma mudança pequena, clara e fácil de revisar.

## Cenário

O product owner pediu um endpoint que devolve a situação do aluno direto, sem o boletim inteiro.

Contrato esperado:

```
GET /students/:id/status
→ 200
{
  "id": 1,
  "name": "Ana Lima",
  "weightedAverage": 8.15,
  "status": "aprovado"
}
```

Quando o aluno não existe, o endpoint devolve 404 com `{ "error": "student_not_found" }`.

## Passo a passo

1. Crie a branch a partir de `main`, nomeie com o padrão `feat/student-status`.
2. Implemente o endpoint reusando o que já existe em `src/grades/grades.service.js`.
3. Escreva pelo menos um teste feliz e um teste de 404 em `tests/student-status.test.js`.
4. Rode `npm run lint` e `npm test`. Só siga se os dois passarem.
5. Faça commits pequenos, no padrão Conventional Commits. Algo como:
   - `feat(students): expõe endpoint /students/:id/status`
   - `test(students): cobre casos feliz e 404 do status`
6. Abra o Merge Request na Adalove usando o template do repo. Preencha todos os campos.
7. Marque pelo menos um colega como revisor.

## Checklist de qualidade

- [ ] Nome da branch segue o padrão combinado
- [ ] Commits pequenos e descritivos
- [ ] Descrição do MR conta o porquê, não só o o quê
- [ ] Testes novos, rodando em verde
- [ ] Lint em zero erros
- [ ] Nenhum segredo ou chave no diff

## Como o professor vai avaliar

Ele entra no MR como se fosse revisor de outra squad. Pergunta de cabeça ao ler:

- Consigo entender a mudança sem abrir o código?
- Os commits contam a história da mudança?
- Os testes cobrem o comportamento novo?
- A mudança é pequena o bastante para revisar em 15 minutos?

Se a resposta a qualquer uma dessas for não, o MR volta para ajustes.

## Entrega

- Link do MR aberto
- Print do pipeline verde no GitLab ou GitHub
