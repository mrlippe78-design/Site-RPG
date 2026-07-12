# Millennium 3.1 — Operação 4

## Polimento, acessibilidade, Codex, imagens, minigames e QA final

Data da execução: 2026-07-12

Branch local: `fix/millennium-3.1-stability-op4`

Base acumulada: Operações 1, 2 e 3.

Nenhuma alteração foi enviada ao GitHub, nenhuma regra foi publicada no Firebase e nenhum dado real foi migrado.

## Resumo executivo

A Operação 4 concluiu o ciclo de implementação local da Reforja Total com foco em apresentação mobile, recursos visuais locais, acessibilidade, diagnóstico e segurança operacional dos minigames. O pacote final mantém todas as operações anteriores e inclui testes, relatórios, screenshots e scripts de auditoria.

## Codex mobile

- cards resumidos com thumbnail entre 84 e 112 px no mobile;
- resumo limitado visualmente;
- metadados separados da narrativa;
- ação explícita “Abrir registro”;
- registro completo em modal;
- imagens com lazy loading e fallback determinístico;
- tablist acessível e navegação por teclado;
- posição do scroll registrada por aba;
- contagem de portadores não é incorporada ao texto narrativo;
- ausência de overflow em 390 × 844 no teste Chromium.

## Imagens e assets

Foram adicionados assets WebP locais para:

- portal do Primeiro Despertar;
- cinco mapas, com versões hero e thumbnail;
- pets usados pela Interface, com versões hero e thumbnail.

Os assets obrigatórios testados possuem menos de 500 KB. O código também gera fallback SVG por categoria quando uma imagem falha, sem reutilizar uma imagem narrativa de outra entrada.

## CSS e responsividade

- nova camada final em `polish.css`;
- safe area para barra inferior e controle de música;
- alvo mínimo de toque;
- campos com 16 px;
- Codex compacto;
- Canvas responsivo;
- estados de foco;
- redução de movimento;
- contraste reforçado quando solicitado pelo sistema.

A dívida de CSS legado foi medida, não escondida. O arquivo `CSS_AUDIT_3_1.md` registra seletores repetidos e a estratégia de consolidação gradual.

## Acessibilidade

- skip link;
- foco visível;
- modal acessível;
- contenção de foco;
- Escape;
- retorno de foco mesmo após render;
- labels e regiões vivas;
- navegação do Codex por teclado;
- alt text e fallback;
- reduced motion.

## Minigames

- ciclo de vida central;
- cancelamento de timers, animações e listeners;
- pausa do Tower Defense;
- Canvas com DPR;
- guardas de idempotência para Mira, Hunt e Tower;
- botões desativados durante resolução;
- sessões visíveis no diagnóstico administrativo.

## Painel de diagnóstico

O Demo Admin mostra:

- build e commit;
- rota;
- estado do Service Worker;
- renders e duração;
- listeners;
- leituras e escritas observadas;
- elemento focado;
- imagens carregadas e falhas;
- sessões de minigame;
- histórico recente;
- exportação JSON.

## Testes executados

### Node

- motor central: 9/9;
- estabilidade: 5/5;
- jornada: 10/10;
- backend: 10/10;
- polimento/Operação 4: 10/10.

Total: **44 aprovados, 0 falhas**.

### Chromium local

Foram executadas 18 verificações:

- Demo Player mobile;
- overflow inicial;
- 52 cards resumidos no Codex;
- overflow do Codex;
- lazy loading;
- resumo compacto;
- modal acessível;
- Escape;
- retorno de foco;
- saúde das imagens;
- início e cancelamento da Mira;
- reduced motion;
- Demo Admin;
- diagnóstico e exportação;
- desktop sem overflow;
- assets críticos presentes.

Resultado: **18 aprovadas, 0 falhas de página e 0 erros internos de console**.

As requisições externas de Firebase e Google Fonts foram bloqueadas de propósito no teste DOM local e registradas separadamente como externas ignoradas.

### Dependências

`npm audit --omit=dev` encontrou **0 vulnerabilidades de produção**.

### Screenshots

- `qa/screenshots/codex-mobile-before.png`;
- `qa/screenshots/codex-mobile-after.png`;
- `qa/screenshots/admin-diagnostics-after.png`.

## Bugs corrigidos

- Codex mobile excessivamente alto e narrativamente misturado;
- ausência de thumbnail/fallback por categoria;
- referências de arte obrigatória ausentes;
- modal sem foco controlado;
- foco perdido após fechar modal e rerender;
- ausência de reduced motion;
- controle de música sobrepondo ações mobile;
- minigames sem ciclo de vida central;
- timers e listeners que podiam sobreviver ao fechamento;
- recompensa repetida por chave de conclusão;
- Tower sem pausa e sem ajuste de DPR;
- diagnóstico administrativo insuficiente.

## Pendências reais

- teste físico em Android Chrome e iPhone Safari;
- teste com VoiceOver e TalkBack;
- teste de rede offline/lenta em aparelho real;
- execução do Firestore Rules Emulator;
- publicação das regras e índices somente após validação;
- consolidação progressiva dos CSS legados;
- segurança econômica por backend confiável ou aprovação administrativa;
- validação do GitHub Pages após publicação em branch/PR.
