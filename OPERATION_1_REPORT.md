# Millennium 3.1 — Operação 1: Base estável

## Escopo executado

A operação foi aplicada sobre o `main` no commit remoto `035e68c18f7c5205e42f163248d619b9cdc1539a`, usando a base 3.1 recebida em cópia local e sem qualquer escrita no Firebase ou no GitHub. A branch local de trabalho é `fix/millennium-3.1-stability-op1`.

Foram tratados somente os pilares da Base estável:

- renderização segura;
- buscas e foco mobile;
- motor único e defensivo de atributos;
- bloqueio do valor 67 e de outras bases inválidas;
- cálculo de desenvolvimento e equipamentos;
- diagnóstico sem reparo automático;
- build, cache e Service Worker;
- verificações automatizadas e documentação de QA.

## Resumo executivo

A aplicação agora posterga atualizações não críticas enquanto há digitação, composição de teclado, formulário alterado ou minigame ativo. Atualizações críticas continuam imediatas. O foco, a seleção do cursor e o scroll são preservados quando um render completo é realmente necessário.

Codex e Mercado usam atualização parcial com debounce de 160 ms. O input permanece no DOM e resultados antigos não substituem a busca mais recente.

Atributos são calculados por uma fonte única. Valores armazenados inválidos continuam visíveis para auditoria, porém são isolados do total efetivo. Nenhum dado antigo é reparado, removido ou migrado automaticamente.

O Service Worker utiliza o cache `millennium-shell-v3.1.0`, valida o shell obrigatório, trata recursos opcionais separadamente, remove caches antigos e usa estratégia network-first para navegação, JavaScript e CSS.

## Arquivos alterados

- `.github/workflows/verify-pages.yml`
- `README.md`
- `app.js`
- `index.html`
- `millennium-core.js`
- `package.json`
- `scripts/verify-deploy.mjs`
- `service-worker.js`
- `styles.css`
- `tests/core.test.mjs`
- `BUG_AUDIT_3_1.md`
- `FIRESTORE_SECURITY_3_1.md`

## Arquivos criados

- `millennium-stability.js`
- `scripts/check-build-consistency.mjs`
- `tests/stability.test.mjs`
- `qa/browser-smoke-results.json`
- `OPERATION_1_REPORT.md`
- `CHANGELOG_3_1.md`
- `QA_CHECKLIST_3_1.md`
- `ROLLBACK_PLAN_3_1.md`
- `MIGRATION_PLAN_3_1.md`
- `VALIDATION_INSTRUCTIONS.md`

## Testes executados

### Automatizados em Node

- verificação de sintaxe: aprovada;
- consistência de build e referências: aprovada;
- motor de atributos: 9/9;
- estabilidade do agendador e debounce: 5/5.

Total Node: **14/14 aprovados**.

### Browser smoke em Chromium

- Demo Player desktop 1366×768;
- Demo Player mobile 390×844;
- Demo Admin desktop;
- instalação real do Service Worker em localhost;
- foco e valor no Codex;
- foco e valor no Mercado;
- rascunho durante render adiado;
- tentativa de manipulação para atributo 67;
- diagnóstico administrativo somente leitura;
- overflow horizontal;
- recursos locais 404.

Total browser: **37/37 aprovados**. O resultado detalhado está em `qa/browser-smoke-results.json`.

### Firestore Rules

Não executado nesta operação. O teste depende de `npm ci`, Java e Firebase Emulator. As regras não foram publicadas e não houve acesso a dados reais.

## Bugs corrigidos

- teclado/foco perdido durante busca no Codex;
- teclado/foco perdido durante busca no Mercado;
- render global destrutivo durante digitação;
- snapshots não críticos sobrepondo formulários ativos;
- buscas antigas podendo concorrer com consultas mais novas;
- base inicial aceitando fluxo de valor absurdo;
- ficha bloqueada usando `Math.max` e perpetuando base corrompida;
- valores corrompidos entrando integralmente no total calculado;
- desenvolvimento sem validação central de saldo e valor;
- item equipado duplicado sendo contado mais de uma vez;
- referências ausentes de raça/classe/afinidade invisíveis ao diagnóstico;
- cache antigo misturando arquivos de builds diferentes;
- instalação do shell vulnerável a recurso opcional ausente;
- ausência de verificação local de versão entre HTML, scripts, manifesto e Service Worker.

## Bugs e trabalhos restantes

Fora do escopo da Operação 1:

- rota Criações ainda precisa de implementação funcional completa;
- Grau de Manifestação ainda precisa ser integrado à interface;
- migração para subcoleções não foi executada;
- mensagens diretas, reports e economia exigem a Operação 3;
- consolidação ampla do CSS pertence à Operação 4;
- testes das regras precisam rodar no Emulator antes de qualquer publicação;
- navegadores reais Android/iOS ainda precisam de validação humana;
- nenhum dado de produção foi usado para testar fichas legadas específicas.

## Segurança

Nenhum script desta entrega publica regras, índices ou dados. O diagnóstico administrativo é somente leitura e não oferece botão de reparo. A futura correção de ficha deverá exigir motivo, log e rollback.
