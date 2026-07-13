
## 3.4.0 — Fundações Vivas

- corrige a edição dos 20 pontos de atributos e preserva o rascunho antes de cada render;
- torna o salvamento da ficha canônico, com estado visível e falhas secundárias não destrutivas;
- adiciona três níveis internos progressivos a cada dificuldade de todos os minigames;
- define uma Afinidade como base de um único Poder e libera uma Técnica a cada cinco níveis;
- completa as descrições, limites, exemplos e orientações de uso das afinidades;
- atualiza missões do Passe a partir de atividades reais e permite coletar o XP concluído;
- liga Ranking e Hall da Fama a projeções ao vivo do Firestore e inclui reconstrução administrativa;
- expande a Jukebox para doze trilhas sintetizadas, sem dependência de arquivos externos;
- preserva cada pacote visual na biblioteca de temas e permite carregar, editar e pré-visualizar presets;
- adiciona atualização emergencial com aviso, contagem regressiva e preservação de rascunhos;
- atualiza regras, cache, build, testes, documentação e rollback para 3.4.0.
- fixa `firebase-tools` em 14.27.0, isola cache/configuração do Emulator e aprova 18 testes de regras com Java 17.

## 3.1.2 — Administração, rankings e criações

- classes dinâmicas integradas ao Codex e às fichas;
- rankings recalculados pelas fichas registradas;
- prestígio administrativo somente leitura;
- exclusão protegida de fichas e contas de teste;
- fluxo de poder controlado pelo Oráculo com confirmação do player;
- regras de segurança atualizadas para respostas e exclusões administrativas.
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

## 3.2.0 — Operação Mundo Vivo

- Unificou o cálculo e a apresentação dos atributos entre player, perfil, admin e ranking.
- Corrigiu resolução de equipamentos antigos e tratou snapshots de afinidade como histórico.
- Adicionou rotação horária global do banner de pets com contador e probabilidades públicas.
- Adicionou 25 artes dedicadas de pets e 18 artes dedicadas de localidades, sem repetição de bytes.
- Adicionou Caçador, Guardião, Feiticeiro e Monge ao catálogo oficial.
- Simplificou o envio de Poderes e Técnicas e consolidou a decisão final no Oráculo.
- Reforçou gacha, Pet Hunt, correio e minigames com persistência, limites e chaves de conclusão.
- Adicionou o minigame Ritual dos Selos.
- Atualizou build, cache, Service Worker, testes, regras e documentação para 3.2.0.
## 3.2.1 — Gestão de contas

- Separação entre reset de ficha, suspensão, banimento e exclusão definitiva.
- Tela de restrição sem carregamento das funções do jogador.
- Exclusão do Firestore com confirmação manual posterior no Firebase Authentication.
- Proteção contra recriação automática durante exclusão pendente.
- Auditoria, idempotência e lock transacional por conta.
- Regras e testes atualizados.

## 3.3.0 — Ecos da Interface

- Corrigiu a recursão infinita de `stopPresenceTracking()`.
- Transformou temas sazonais em dez pacotes visuais configuráveis e agendáveis.
- Restringiu o dourado ao tema Despertar e a elementos especiais.
- Reorganizou a navegação em Obrigatório, Recomendado, Opcional e Lazer.
- Separou Jogos rápidos, Desafios e Recreação.
- Preservou Ritual dos Selos e adicionou Cartografia Perdida e Alquimia Instável.
- Adicionou preferências de aparência, animação, contraste e economia de dados.
- Atualizou build, cache, testes, documentação e regras para 3.3.0.
