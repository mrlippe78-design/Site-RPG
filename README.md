# Millennium RPG — Interface do Oráculo

Plataforma web de suporte ao Millennium RPG textual, com Firebase Authentication, Firestore e publicação estática no GitHub Pages.

## Build atual

- Versão: `3.1.0`
- Fase: **Operação 1 — Base estável**
- Fonte de cálculo de atributos: `millennium-core.js`
- Camada de estabilidade de renderização: `millennium-stability.js`
- Cache: `millennium-shell-v3.1.0`

Esta etapa corrige foco, teclado, buscas parciais, agendamento seguro de render, validação dos 20 pontos-base, isolamento de fichas corrompidas, desenvolvimento por ponto, identificação de build e instalação do Service Worker. Não executa migração de dados reais.

## Validação local

```powershell
npm test
py -m http.server 5173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:5173` e valide Demo Player e Demo Admin conforme `QA_CHECKLIST_3_1.md`.

O comando `npm test` executa sintaxe, consistência de build e 14 testes de regressão. Os testes das regras exigem dependências instaladas e o Emulator Suite:

```powershell
npm ci
npm run test:rules
```

## Firebase

Os arquivos `firestore.rules`, `firestore.indexes.json` e `firebase.json` permanecem versionados, mas **não são publicados automaticamente**. Não publique regras novas antes de executar o Emulator, revisar os fluxos de produção e preparar rollback.

## Publicação segura

1. Trabalhe em uma branch `fix/...`;
2. execute `npm test`;
3. abra o site local e valide Demo Player/Admin;
4. abra Pull Request sem merge automático;
5. após o merge, confirme o GitHub Pages com `node scripts/verify-deploy.mjs --build 3.1.0`;
6. trate regras e índices do Firebase como uma publicação separada.

Consulte `OPERATION_1_REPORT.md`, `ROLLBACK_PLAN_3_1.md` e `FIRESTORE_SECURITY_3_1.md`.

## Conceito

O site funciona como a interface mística de Millennium: um suporte dentro e fora do RPG, inspirado em HUDs de progressão como Solo Leveling. A função administrativa aparece para os jogadores como `Oráculo`; internamente, o papel continua sendo `role: "admin"` para manter as regras do Firebase simples.

## Recursos principais

- Atualizacao player focada em UX: modo Demo sempre visivel no login, HUD mobile com quatro atalhos + Mais, perfil com camada social, moldura visual no avatar, titulo ativo, mini status e tokens.
- Minigames 1.1: Prova da Mira com combo, alvo raro, alvo de congelar tempo e limpeza segura ao fechar; recompensas agora mostram rank de desempenho e historico recente.
- Pet Hunt mostra risco, duracao e loot esperado; pets podem voltar livres, feridos ou mortos em dificuldades altas, com recuperacao por Millennium Coins no cofre.
- Tower Defense usa rotas proprias por mapa, inimigos por faccao, deck de ate quatro pets, reposicionamento gratuito entre ondas, upgrades, score e recompensa real.
- Mercado 3.0 separa Destaques, Bazar, Passe, Cosmeticos, Fragmentos, Invocacao, Guilda, Leilao, Crafting e Cofre. Compras oficiais com PO, trocas de fragmento, resgates do passe e negociacoes entre players funcionam sem fila do Oraculo.
- Ranking virou central de ranks com filtros diario, semanal, temporada e todos os tempos: prestigio, nivel, PO, Millennium Coins, afinidades, missoes, giros, minigames, pets, itens, guildas, perfil, passe, colecoes e raridades altas.
- Oraculo agora edita e envia Millennium Coins, energia diaria, Fragmentos do Despertar e pets/itens direto para o cofre dimensional.
- Musica ambiente procedural ganhou arpejos leves para ficar mais medieval e menos repetitiva, sem depender de YouTube ou MP3 externo.
- Área Player separada da área do Oráculo.
- Player tem perfil público/privado, ficha, roleta de afinidade, inventário, grimório, chat, guildas, mercado, missões, diário, Codex e reports.
- Oráculo tem painel de controle, inspeção/edição de fichas, recompensas, títulos, tokens, pets, PO, essências, itens, afinidades, punições e modo manutenção.
- Forja do Oráculo cria e edita raças, classes, categorias de afinidade, afinidades, itens, missões, biomas, reinos, regiões, NPCs, regras, FAQ, tutorial, bestiário, mercado, leilões, crafting, conquistas, passe e reputações. Pets, itens de gacha, lojas de fragmentos, banners/rate-up e mapas Tower usam formulários visuais em vez de JSON.
- Chat global, mensagens diretas e chat de guilda com denúncia por mensagem, emojis, jogadores online e exclusão automática para manter no máximo 60 mensagens por sala.
- Presença fica offline ao sair e também desconecta player inativo depois de cerca de 10 minutos.
- Missões, treinos, poderes e técnicas passam pela fila de validação do Oráculo. Passe, mercado, inventário, forja, fusão e recompensas liberadas são administrados pelo próprio player.
- Antes do RPG começar, sistemas profundos ficam bloqueados; o Oráculo pode usar `Começar RPG` para liberar a Temporada do Despertar.
- Botão de pânico desconecta players e publica alerta emergencial; modo manutenção fecha ou reabre a interface para todos exceto o Oráculo.
- Ao começar o RPG, players atuais recebem o pacote Testador Beta: título, token, 10 essências e passe premium liberado.
- Roleta 2.0 tem giro 1x/10x, pity, sons, histórico, prestígio, eventos/rate-up, proteção contra downgrade de raridade e escolha manual quando o giro 10x empata melhores afinidades.
- Invocação dimensional separada da roleta: Essência continua exclusiva para afinidade, e Millennium Coins servem para banners de pets e itens.
- Cofre invocado com pets/itens, estrelas até 7, variante Radiante, equipar, fundir duplicatas, desfazer em fragmentos e enviar para inventário/perfil sem validação manual.
- Minigames 1.0 com energia diária, dificuldades Noob até God Slayer, Prova da Mira jogável, Pet Hunt com atividades simultâneas por pet e Tower Defense estratégico com mapas temáticos originais.
- Mercado inclui vitrine, leilão, crafting, cofre e Passe da Temporada do Despertar com trilha Free e Premium até o nível 50.
- Passe agora tem aba própria no menu, hero da Temporada do Despertar, missões e trilha horizontal Free/Premium até o nivel 50. Recompensas desbloqueadas sao coletadas diretamente pelo player.
- Tema visual de temporada 2.0: `Despertar dos Heróis` já vem com runas/brilho e a estrutura aceita Vazio, Sangue, Geada, Brasa e Natureza.
- Login foi redesenhado como tela de inicialização da Interface de Millennium, com responsividade melhor para celular.
- Favicon próprio do Millennium em `favicon.svg`.
- Música ambiente procedural com botão de ligar/desligar, sem depender de arquivo MP3 externo.
- Upload/preview de imagens usando Cloudinary para avatar, banner, itens, raças, classes, afinidades, NPCs, biomas, reinos e regiões. O Firebase salva apenas as URLs.
- Avatar e banner têm editor visual de enquadramento com posição horizontal, vertical, zoom e prévia fiel do cartão público.
- Perfil aceita avatar/banner por URL ou GIF, descrição pública, abas, tokens estilo badge, títulos, pets, itens, poderes, histórico e conquistas.
- Guildas custam 1.000 PO, têm limite de 10 membros, lista pública, pedidos de entrada, brasão, descrição, chat, mural, partys de até 4 players e missões próprias.
- Codex do player mostra afinidades, raridades, quantidade de donos em tempo real, raças, classes, biomas, reinos, regiões, NPCs, procurados, bestiário e facções.
- Guia inclui tutorial inicial, livro de regras por capítulos, FAQ, termo de acordo e busca global.
- Mobile tem HUD fixo com cinco atalhos e Mais, sem cortar a largura; desktop tem menu lateral com rolagem.

- Mega update Dark Fantasy: login "Primeiro Despertar" com arte original em `assets/first-awakening-portal.png`, PWA instalavel, Service Worker com navegacao sempre atualizada e icone do Millennium.
- Invocacao ganhou revelacao fullscreen com cartas em sequencia, sons sintetizados por raridade, resultados para print e pool ampliado de pets Quebrados, Comuns, Incomuns, Epicos e Lendarios.
- Evolucao de estrelas agora exige duas copias livres do mesmo registro, mesma raridade, mesmo estado Radiante e mesma quantidade de estrelas antes da fusao.
- Minigames 2.1: Mira inclui armadilhas, alvos moveis, erros e tela final; Hunt ganhou acompanhamento visual, risco, loot parcial e retorno; Tower Defense e uma partida real em canvas com rotas territoriais, runas reposicionáveis, ondas, vidas, facções, elites, essencia e upgrades.

- Atualizacao de estabilidade: listeners de presença não reconstroem mais telas sem necessidade, seleções de Hunt/Tower sobrevivem a atualizações, chat preserva a rolagem e mensagens mostram avatar, personagem, player e título ativo.
- Ranking agora só mostra Diário/Semanal/Temporada/Todos quando existe histórico datado; patrimônio atual deixa claro que não depende de período.
- Loja de fragmentos exibe todos os saldos, progresso `possui/necessário`, quantidade faltante e bloqueia trocas sem saldo.
- Pets sem arte própria recebem um retrato procedural exclusivo em vez de repetir a imagem de outro personagem.

## Coleções Firestore usadas

- `users/{uid}`
- `characters/{uid}`
- `settings/system`
- `races/{id}`
- `classes/{id}`
- `affinityCategories/{id}`
- `affinities/{id}`
- `itemCategories/{id}`
- `items/{id}`
- `gachaPets/{id}`
- `gachaItems/{id}`
- `gachaShardShops/{id}`
- `towerMaps/{id}`
- `missionPool/{id}`
- `weeklyMissions/{id}`
- `biomes/{id}`
- `kingdoms/{id}`
- `regions/{id}`
- `npcs/{id}`
- `globalMessages/{id}`
- `campaignDiary/{id}`
- `socialRequests/{id}`
- `guilds/{id}`
- `guildMessages/{id}`
- `guildMissions/{id}`
- `directMessages/{id}`
- `profileViews/{id}`
- `rulesChapters/{id}`
- `faqEntries/{id}`
- `tutorialSteps/{id}`
- `wantedBoard/{id}`
- `bestiary/{id}`
- `marketListings/{id}`
- `auctionListings/{id}`
- `craftingRecipes/{id}`
- `techniqueLibrary/{id}`
- `achievements/{id}`
- `seasonPass/{id}`
- `passMissions/{id}`
- `reputationFactions/{id}`
- `reports/{id}`
- `progressRequests/{id}`

## Regras

Depois desta mega atualizacao, publique novamente `firestore.rules`: Passe, minigames e o novo enquadramento (`avatarFocusX/Y`, `avatarZoom`, `bannerFocusX/Y`, `bannerZoom`) dependem das regras atuais.

Use `firestore.rules` como base de segurança e publique no console do Firebase depois de atualizar o site. As imagens vão para o Cloudinary usando `cloudName: cakvvuqx` e `uploadPreset: Millenium`; não é necessário ativar Firebase Storage para esta versão. O email `mrlippe78@gmail.com` está autorizado como Oráculo; a senha deve existir apenas no Firebase Authentication.

## Operação 2 — Jornada do Personagem

A criação técnica, Dar Vida, Culturas, Ofícios, onboarding e Grau de Manifestação são carregados por `millennium-journey.js` e `journey.css`.

Comandos de validação:

```bash
npm test
python -m http.server 5173
```

Esta operação não publica regras do Firebase e não executa migração. `firestore.rules` e `firestore.indexes.json` permanecem no pacote para uma etapa separada de segurança e backend.
## Módulos da Operação 3

- `millennium-backend.js`: contratos de Criações, Reports, mensagens, listeners e migração.
- `backend.css`: componentes de comunicação e administração.
- `scripts/plan-migration.mjs`: gera plano dry-run a partir de JSON anonimizado.
- `tests/backend.test.mjs`: testes puros da camada de backend.
- `tests/operation3.integration.test.mjs`: verifica integração dos arquivos.
- `tests/firestore.rules.test.mjs`: cenários para execução no Emulator.

Nenhum script deste pacote publica regras ou migra dados automaticamente.


## Operação 4 — polimento e QA

O projeto agora inclui:

- Codex mobile resumido;
- assets WebP locais e fallbacks;
- camada `polish.css`;
- acessibilidade de modal e navegação;
- ciclo de vida dos minigames;
- painel de diagnóstico;
- auditoria de CSS e browser smoke.

Comandos:

```bash
npm test
python scripts/browser_smoke_op4.py
```

Consulte `OPERATION_4_REPORT.md`, `VALIDATION_OPERATION_4.md` e `FINAL_DELIVERY_3_1.md`.
