# Guia do professor, aula 04

Aula presencial de 2h30, invertida. Os alunos já fizeram os auto estudos. A aula é toda prática, em torno deste repo.

## Tempo da aula

| Bloco | Tempo | Atividade |
|-------|-------|-----------|
| Check-in e recap dos auto estudos | 15 min | Plenária curta, alinhar vocabulário |
| Exercício A, abrir MR | 35 min | Duplas, cada uma abre sua MR |
| Debrief A | 10 min | Olhar duas MRs no projetor, discutir |
| Exercício B, revisar MR | 30 min | Individual, cada aluno revisa `feat/scholarship-check` |
| Debrief B | 15 min | Agregar pontos em um quadro comum |
| Exercício C, Sonar | 30 min | Duplas, triar apontamentos |
| Exercício D, IA na revisão | 10 min | Pede para usar IA no mesmo MR do B |
| Fechamento | 5 min | Pontos de atenção e próxima aula |

## Antes da aula

- Confirme que o Docker está instalado na máquina dos alunos
- Tenha uma MR já aberta pelo professor em `feat/scholarship-check` para o exercício B
- Abra o Sonar local uma vez em casa para puxar a imagem (caso contrário o primeiro pull trava a aula)

## Smells plantados no código, mapa rápido

Use este mapa durante o exercício C para não se perder.

| Arquivo | Linha aproximada | Tipo | O que o Sonar deve apontar |
|---------|------------------|------|----------------------------|
| `src/config/index.js` | 3, 4 | segurança | credencial hardcoded (`jwtSecret`, `adminPassword`) |
| `src/config/index.js` | 7 | code smell | constante mágica usada por fora (`passingScore`) |
| `src/utils/validators.js` | 5, 14 | code smell | `==` em vez de `===` |
| `src/utils/validators.js` | 41 a 65 | complexidade | cognitive complexity alta em `classifyScore`, else aninhado |
| `src/utils/validators.js` | 66 a 68 | dead code | reatribuição de `label` que já foi tratada |
| `src/grades/grades.service.js` | 21 | code smell | `==` múltiplos na mesma linha |
| `src/grades/grades.service.js` | 51 a 57 | duplicação | `computeSimpleAverage` e `computeWeightedAverage` repetem laço |
| `src/grades/grades.service.js` | 70 a 74 | dead code | condição `totalCredits == 0` inalcançável |
| `src/db.js` | 71 | no-unused-vars | `_err` declarado e não usado (intencional, Sonar não reclama, mas ESLint sim) |
| `src/app.js` | 23, 35 | no-console | `console.error` e `console.log` em produção |

Total esperado: por volta de dez apontamentos, o suficiente para uma triagem rica em 30 minutos.

## Respostas esperadas por exercício

### Exercício A

- Nome de branch `feat/student-status`
- Pelo menos dois commits, Conventional Commits
- Um teste feliz, um teste 404, ambos verdes
- Descrição do MR preenche o porquê além do o quê

### Exercício B, o que um bom revisor deve pegar em `feat/scholarship-check`

A lista completa do que está errado no MR proposital está em [`exercicio-b-respostas.md`](./exercicio-b-respostas.md). Abra depois do debrief da turma.

### Exercício C

- Credenciais hardcoded em `config/index.js` devem ser tratadas como blocker de segurança
- `==` em vários lugares deve virar `===`, ou nit ou blocker a depender da convenção
- `classifyScore` precisa de refactor, pode ser issue
- Duplicação entre médias simples e ponderada é um candidato a `nice-to-have`
- `totalCredits == 0` morto deve sair

### Exercício D

- Humano pega mais contextos de domínio, a IA pega mais padrões sintáticos
- A IA tende a listar tudo, o humano prioriza
- Ambos podem errar, por isso a triagem humana permanece necessária

## Pontos de atenção

- Em laboratórios com rede lenta, o Sonar pode demorar 3 a 4 min para subir no primeiro start
- Se algum aluno não tiver Docker, ele faz par com alguém que tem
- O exercício D depende de acesso à IA que a escola libera, confira com TI antes da aula

## Próxima aula

Aula 05 entra em arquitetura e gabaritos de projeto. Deixe os alunos saírem com a sensação de que qualidade não é uma etapa separada, é algo que aparece na escrita do código, na revisão e no painel.
