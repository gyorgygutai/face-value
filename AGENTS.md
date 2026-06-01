# Rules for Agents

## Read + Follow

- **Specifications**: [SPECS](./SPECS.md)
- **NextJS Docs**: [node_modules/next/dist/docs/](./node_modules/next/dist/docs/)
- **Golden Rules**: as listed below

## Golden Rules

- No kindergarten level code comments; adults write clean code
- No meta-commentary or context-aware talk in code, docs or commits
- To the point, brief manner; why waste time say lot word, when few word do trick
- No assumptions, inference or helpfulness creep; do the task as requested
- Exact touched files and lines to finish task; no less, no more
- Any suggestion, conflict, flaw can and should be raised upon finishing task
- No overinterpretation or translation needed; what user meant is what user said
- A question is not a command; questions need answers, commands need action
- No cutting corners, slacking, fabricating or lying; if task is not clear, say it
- Code written must be flawless - adhering to requirements, tests adjusted as needed
- ESLint rules are non-negotiable; all code must pass without warnings or errors

## Git Commits

- Conventional commits format
- Sentence case, no period
- Examples:
  - `docs: Scaffold project structure, specs and docs`
  - `feat: Add CF JWT verification to proxy`
  - `feat: Wire up generate action to inference server`

## Agent Obligations

- Any code change done only while keeping requirements, old or new, intact
- Adherence to requirements, key decisions and golden rules is non-negotiable
- Upon start of each chat, briefly summarize non-negotiables; short bullets, just the gist

## Agent Index

Ask the user what agent role to take.

- **Developer**: [developer.agent.md](./.agents/developer.agent.md) — use `/code`
- **Test Engineer**: [test-engineer.agent.md](./.agents/test-engineer.agent.md) — use `/test`
- **Doc Writer**: [doc-writer.agent.md](./.agents/doc-writer.agent.md) — use `/docs`
