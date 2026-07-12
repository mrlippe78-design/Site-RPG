# Changelog 3.1 — Operação 1

## Adicionado

- camada `millennium-stability.js` para debounce, coalescência de renders e histórico limitado;
- preservação central de foco, seleção e scroll;
- atualização parcial das buscas do Codex e Mercado;
- diagnóstico defensivo de fontes de atributos;
- isolamento de base corrompida sem alterar o Firestore;
- validação de gasto de Pontos de Desenvolvimento;
- verificador local de consistência de build;
- testes de estabilidade e novos testes do núcleo;
- workflow de qualidade para branches e Pull Requests;
- documentação de validação e rollback.

## Corrigido

- perda de teclado durante busca;
- renders não críticos durante edição;
- valor 67 na base técnica;
- perpetuação de valores altos pelo antigo `Math.max`;
- duplicidade de equipamentos no cálculo;
- cache inconsistente entre versões;
- falha total de instalação por recurso opcional.

## Não alterado

- `firestore.rules` não foi publicado;
- dados reais não foram lidos ou migrados;
- catálogos e conteúdo narrativo não foram expandidos;
- nenhuma integração com WhatsApp foi criada.

---

# Operação 2 — Jornada do Personagem

## Adicionado

- módulo `millennium-journey.js` com jornada de doze etapas;
- Home `Hoje em Millennium` com próxima ação, estado, acontecimentos e pendências;
- rotas de Culturas e Ofícios com busca, filtro e detalhes;
- complementação segura de origem para fichas antigas;
- Grau de Manifestação e Perfil de Potencial na interface;
- módulo visual `journey.css`;
- rota informativa de Poderes e Técnicas;
- testes de jornada e integração.

## Corrigido

- rota Criações sem renderer;
- onboarding sem progresso real;
- Grau de Manifestação calculado, mas invisível;
- ausência de consulta detalhada de cultura e ofício durante a criação;
- falta de caminho para completar origem de fichas bloqueadas.

## Preservado

- raças e classes canônicas;
- fórmula central de atributos;
- ausência de bônus de atributo para cultura e ofício;
- dados antigos;
- regras do Firebase sem publicação;
- ausência de integração com WhatsApp.
## Operação 3 — Backend e comunicação

- Criações completas com nerf, revisão e projeção aprovada.
- Reports com protocolos, contexto técnico e auditoria.
- Conversas privadas paginadas com envio otimista e idempotência.
- Listeners sob demanda por rota.
- Projeções públicas pequenas com privacidade.
- Regras e índices atualizados.
- Planejamento de migração idempotente e rollback.
- 34 testes Node e 9 smoke tests em Chromium aprovados.


## Operação 4 — Polimento e QA final

### Adicionado

- `millennium-polish.js` com ciclo de vida de minigames, fallbacks visuais e diagnóstico;
- `polish.css` com camada final responsiva e acessível;
- assets WebP locais para portal, mapas e pets;
- painel administrativo de diagnóstico e exportação;
- auditoria automática de CSS;
- testes de polimento e integração;
- screenshots antes/depois do Codex mobile.

### Alterado

- Codex com cards resumidos, metadados, lazy loading e detalhes em modal;
- foco de modal, Escape, retorno de foco e navegação por teclado;
- Prova da Mira, Hunt e Tower Defense com ciclo de vida e idempotência;
- Service Worker e verificação de build para novos módulos e assets;
- controle de música reposicionado para safe area mobile.

### Corrigido

- overflow do Codex mobile;
- recursos obrigatórios ausentes;
- timers e listeners residuais dos minigames;
- recompensa repetida por resolução duplicada;
- foco perdido após fechar modal;
- falta de redução de movimento.
