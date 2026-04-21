# academic-tracker

Aplicação didática da Aula 04 do Módulo 13 de Engenharia de Software, Inteli T13. API Node.js + Express + SQLite para acompanhar alunos, cursos e notas. Serve de cenário para três exercícios de qualidade de código, revisão de MR e análise estática.

## Stack

- Node.js 20
- Express 4
- SQLite (better-sqlite3) em memória, zero dependência de banco externo
- Jest para testes
- ESLint + Prettier para estilo
- SonarQube Community Edition (análise estática), via Docker Compose local ou variáveis de ambiente no pipeline

## Como subir local

```bash
npm install
npm test
npm run dev       # sobe em http://localhost:3000
```

## Os três exercícios da aula

A aula 04 (07/05/2026) usa este repo como laboratório. Há um guia por exercício em `docs/`.

| Exercício | Foco | Guia |
|-----------|------|------|
| A | Autor de MR, abrir uma MR seguindo boas práticas | `docs/exercicio-a-abrir-mr.md` |
| B | Revisor de MR, analisar uma MR já aberta | `docs/exercicio-b-revisar-mr.md` |
| C | Análise estática, triar apontamentos do Sonar | `docs/exercicio-c-sonar-triagem.md` |

O guia do professor em `docs/guia-do-professor.md` traz o caminho do tempo da aula, os pontos de atenção e as respostas esperadas de cada exercício.

## Estrutura do código

```
src/
  app.js                         Express app, monta rotas
  db.js                          Conexão SQLite + seed
  students/                      Cadastro de alunos
  courses/                       Cadastro de cursos e turmas
  grades/                        Lançamento de notas e cálculo de CR
  utils/                         Helpers e validadores (contém smells para o Sonar)
  config/                        Configurações (contém hardcoded propositais)
```

## Análise com SonarQube, dois caminhos

### Local, via Docker Compose

```bash
npm run sonar:up       # sobe Sonar + Postgres em localhost:9000 (admin/admin)
npm run sonar:scan     # roda sonar-scanner contra o servidor local
npm run sonar:down     # derruba tudo e remove volumes
```

Primeiro acesso ao Sonar (admin/admin) pede troca de senha. Depois é só abrir `http://localhost:9000` e olhar o projeto `academic-tracker`.

### Pipeline (GitLab ou GitHub Actions)

O `.gitlab-ci.yml` e o `.github/workflows/ci.yml` já trazem o job `sonar` pronto. Ele só roda quando as variáveis de ambiente `SONAR_HOST_URL` e `SONAR_TOKEN` estão definidas como variáveis protegidas do projeto. Sem isso, o job fica em `skipped`. Na aula isso é proposital, mostra o contrato sem depender da infra.

## Convivência com os alunos

Os alunos vão:

1. Clonar o repo
2. No exercício A, criar uma branch e abrir uma MR no GitLab (ou PR no GitHub)
3. No exercício B, revisar uma MR já aberta pelo professor
4. No exercício C, rodar o Sonar local e triar os apontamentos

O repo já tem smells plantados de propósito para gerar resultado interessante no Sonar. Ver `docs/guia-do-professor.md` para mapa dos smells e esperados.

## Licença

MIT, livre para uso didático.
