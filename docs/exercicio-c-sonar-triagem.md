# Exercício C, triagem de Sonar

## Papel

Você faz parte do time que acabou de plugar o SonarQube no pipeline. O painel encheu de pontos amarelos e vermelhos. Ninguém vai consertar tudo hoje. Seu trabalho é decidir o que entra na fila.

## Cenário

Rode o Sonar local e veja o relatório do projeto `academic-tracker`.

## Setup

Rode o Sonar local ou aponte para um servidor do pipeline.

### Local

```bash
npm run sonar:up         # sobe Sonar + Postgres em http://localhost:9000
# primeiro acesso pede troca de senha a partir de admin/admin
npm run sonar:scan       # roda sonar-scanner com coverage
```

Quando terminar: `npm run sonar:down`.

### Pipeline

Se você definiu `SONAR_HOST_URL` e `SONAR_TOKEN` como variáveis do projeto, o job `sonar` do pipeline já roda sozinho a cada push. Abra o painel do Sonar e veja os resultados.

## O que fazer

1. Abra o dashboard do `academic-tracker` no Sonar.
2. Liste todos os apontamentos em três colunas no seu caderno:

   | Severidade | Arquivo:Linha | Regra | O que diz | Sua decisão | Motivo |
   |------------|---------------|-------|-----------|-------------|--------|

   Sua decisão é uma destas três:
   - **consertar agora**, dentro desta aula
   - **abrir issue**, consertar depois com contexto
   - **ignorar**, justificando por que o alerta não se aplica

3. Escolha um apontamento da coluna "consertar agora" e abra uma MR corrigindo, seguindo as boas práticas do exercício A.

## Como pensar a triagem

Um alerta do Sonar não é verdade absoluta. Ele te dá um sinal. Você decide se pega ou descarta com base em:

- **Risco real**, se ignorado, o que pode quebrar?
- **Custo de corrigir**, quanto tempo custa agora?
- **Dívida técnica acumulada**, dá para empurrar sem sangrar?
- **Contexto do código**, o alerta faz sentido aqui ou é ruído?

Não existe resposta única. Existe justificativa.

## Entrega

- Tabela completa preenchida
- Link do MR que corrige um dos apontamentos
- Três linhas contando o que você aprendeu do painel do Sonar que não teria percebido só lendo o código

## Referências

- [SonarSource, what is cognitive complexity](https://www.sonarsource.com/resources/cognitive-complexity/)
- [SonarQube rules for JavaScript](https://rules.sonarsource.com/javascript/)
