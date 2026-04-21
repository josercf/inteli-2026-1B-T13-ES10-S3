# Exercício D, IA como revisora

## Papel

Você está comparando sua revisão humana com o que a IA aponta. Os dois são parciais, complementares, e ambos podem errar.

## Contexto

O mercado hoje usa IA em três momentos da revisão:

- **sugestão in-editor**, Copilot, Cursor, Codeium te oferecem código conforme você digita
- **revisão automática de MR**, GitLab Duo, Copilot Code Review, Graphite AI comentam direto no diff assim que a MR abre
- **conversa com o código**, você cola um diff no chat (Claude, ChatGPT, Gemini) e pergunta o que está ruim

Cada um tem um ponto cego diferente.

## Exercício

Use o MR do exercício B como base. Você já tem sua revisão humana. Agora:

1. Escolha uma ferramenta de IA disponível.
   - GitLab Duo na pipeline, se o repo estiver no GitLab
   - GitHub Copilot Code Review no pull request, se estiver no GitHub
   - Claude, ChatGPT ou Gemini no chat, colando o diff
2. Peça à IA para revisar o MR usando a mesma rubrica do exercício B: blocker, nit, question.
3. Preencha a tabela abaixo no seu caderno:

   | Ponto apontado | Origem | Humano pegou? | IA pegou? | Quem acertou mais? |
   |----------------|--------|---------------|-----------|---------------------|

4. Classifique cada ponto em:
   - **convergente**, humano e IA viram a mesma coisa
   - **complementar**, um dos dois trouxe algo que o outro não viu
   - **ruído da IA**, a IA reclamou de algo que não procede
   - **angulo morto humano**, a IA pegou algo que você deixou passar

## Pergunta de plenária

Volte para a turma com sua opinião, uma a duas linhas, sobre:

- Onde a IA é mais útil na revisão?
- Onde você ainda confia mais no revisor humano?
- Qual foi o comentário da IA que mais te surpreendeu, para bem ou para mal?

## Referências

- [GitHub, using Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/review-code)
- [GitLab Duo, code review features](https://docs.gitlab.com/ee/user/project/merge_requests/duo_in_merge_requests.html)
- [Anthropic, using Claude for code review](https://docs.anthropic.com/claude/docs/code-review)
