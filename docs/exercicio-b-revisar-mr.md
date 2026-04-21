# Exercício B, revisar um Merge Request

## Papel

Você é o revisor. O MR já está aberto na branch `feat/scholarship-check` e pede para ser revisado.

## Cenário

A área comercial quer mostrar ao aluno se ele está dentro ou fora do programa de bolsa. A regra é simples: se a média ponderada for maior ou igual a 8, o aluno mantém a bolsa. Senão, perde.

Um colega abriu um MR tentando resolver isso. O código compila, os testes rodam. Mesmo assim, o MR tem problemas. Sua tarefa é apontá-los.

## Como revisar

1. Abra a MR na Adalove ou clone a branch:
   ```bash
   git fetch origin feat/scholarship-check
   git checkout feat/scholarship-check
   ```
2. Rode `npm install && npm test && npm run lint` antes de olhar o diff.
3. Leia o diff duas vezes. Primeira passada para entender a intenção. Segunda para questionar cada linha.
4. Classifique cada ponto que você achar em uma das três categorias do Google Engineering Practices:
   - **blocker**, o MR não entra sem resolver
   - **nit**, pequeno ajuste, opcional
   - **question**, dúvida que precisa de resposta antes de aprovar

Deixe comentários diretos no diff. Seja gentil com a pessoa e duro com o código.

## Dicas de onde olhar

Use este roteiro antes de marcar o MR como aprovado:

- A mensagem de commit descreve a mudança?
- O nome da branch segue convenção do projeto?
- Existe teste para o comportamento novo?
- Os números do domínio são constantes nomeadas ou estão soltos?
- Há validação para entrada inválida?
- O MR carrega algo que não deveria (chaves, debug, arquivos de lock)?
- O diff cabe na cabeça em 15 minutos? Se não, o MR está grande demais.

## Entrega

- Print dos comentários que você deixou no MR
- Tabela curta no seu caderno resumindo as categorias:
  | Ponto                        | Categoria | Justificativa |
  | ---------------------------- | --------- | ------------- |
  | ...                          | blocker   | ...           |

## Referências que usamos hoje

- [Google Engineering Practices, the code reviewer's guide](https://google.github.io/eng-practices/review/reviewer/)
- [GitHub, how to review code effectively](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)
