# Exercício B, respostas esperadas

Guia do professor. Abrir só depois do debrief da turma. A branch `feat/scholarship-check` foi plantada com doze pontos problemáticos de propósito. Uma boa revisão pega pelo menos oito.

## Sobre o MR

- **Título**, `Ajuste bolsa`
- **Descrição**, vazia
- **Branch**, `feat/scholarship-check`
- **Mudança**, adiciona endpoint `/students/:id/scholarship`

## Pontos que um revisor sênior pega

### Blockers

1. **Credencial em claro**, o autor adicionou `process.env.ADMIN_TOKEN || 'admin123'` em `src/grades/grades.service.js`. Não pode cair em produção com default.
2. **Sem teste**, a nova rota não tem cobertura. `scholarship-check` entra sem rede de segurança.
3. **Magic number 8**, o valor mínimo está escrito à mão no meio da lógica. Deveria ser constante nomeada.
4. **Sem validação de entrada**, aceita `id` negativo, 0, string. Devolve 500 em vez de 400.
5. **Sem tratamento do 404**, aluno inexistente quebra com stack trace.

### Questions

6. **Por que duplicar a lógica de média ponderada?** O autor copiou `computeWeightedAverage` em vez de importar. Isso vai desandar quando a regra mudar.
7. **Por que `==` em vez de `===`?** A base do projeto já usa `===`. O novo código quebra a convenção.

### Nits

8. **`console.log` sobrando**, tem um `console.log("chegou aqui")` no handler.
9. **Mensagem de commit genérica**, um único commit chamado `ajuste`.
10. **Descrição do MR vazia**, não dá contexto ao revisor.
11. **`buildError` importado e nunca usado**, código morto entrando no repo.
12. **Função chamada `calc`**, sem dizer o que calcula.

### Bônus, caso o revisor aprofunde

- `// eslint-disable-next-line no-unused-vars` mascarando uma variável `_token` que existe só para "usar" o segredo. Sinal de alerta: lint silenciado é lint escondido.

## Pontos bônus, se o aluno for longe

- Perguntar se existe teste de integração cobrindo a rota nova
- Sugerir que a constante do limiar vire config (ambiente ou config/index.js)
- Pedir para separar a refatoração da média em outro MR

## Como pontuar

- 4 ou menos pontos, ainda em formação como revisor
- 5 a 7 pontos, revisor funcional, pega o essencial
- 8 ou mais, revisor maduro, pega contexto além do sintático

## O que NÃO cobrar

- Estilo de aspas, Prettier já cuida
- Preferência por arrow function vs function declaration
- Nomes de variáveis locais quando a intenção está clara
