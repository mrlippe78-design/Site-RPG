# Millennium RPG Support

Plataforma web de suporte para o Millennium RPG, usando Firebase Auth + Firestore.

## Rodar local

```powershell
py -m http.server 5173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:5173`.

## Conceito

O site funciona como a interface mística de Millennium: um suporte dentro e fora do RPG, inspirado em HUDs de progressão como Solo Leveling. A função administrativa aparece para os jogadores como `Oráculo`; internamente, o papel continua sendo `role: "admin"` para manter as regras do Firebase simples.

## Recursos principais

- Atualizacao player focada em UX: modo Demo sempre visivel no login, HUD mobile com quatro atalhos + Mais, perfil com camada social, moldura visual no avatar, titulo ativo, mini status e tokens.
- Minigames 1.1: Prova da Mira com combo, alvo raro, alvo de congelar tempo e limpeza segura ao fechar; recompensas agora mostram rank de desempenho e historico recente.
- Pet Hunt mostra risco, duracao e loot esperado; pets podem voltar livres, feridos ou mortos em dificuldades altas, com recuperacao por Millennium Coins no cofre.
- Tower Defense ganhou relatorio visual de defesa com mapa, ondas, rotas, score e recompensa enquanto o modo jogavel completo fica preparado para evolucao futura.
- Mercado 2.0 separa Destaques, Millennium, Fragmentos, Passe, Leilao, Crafting e Cofre. Trocas de fragmento funcionam direto e compras comuns viram solicitacao ao Oraculo.
- Ranking virou central de ranks: prestigio, nivel, PO, Millennium Coins, Mira, Pet Hunt, Tower, pets, itens, guildas e visualizacoes de perfil.
- Oraculo agora edita e envia Millennium Coins, energia diaria, Fragmentos do Despertar e pets/itens direto para o cofre dimensional.
- Musica ambiente procedural ganhou arpejos leves para ficar mais medieval e menos repetitiva, sem depender de YouTube ou MP3 externo.
- Área Player separada da área do Oráculo.
- Player tem perfil público/privado, ficha, roleta de afinidade, inventário, grimório, chat, guildas, mercado, missões, diário, Codex e reports.
- Oráculo tem painel de controle, inspeção/edição de fichas, recompensas, títulos, tokens, pets, PO, essências, itens, afinidades, punições e modo manutenção.
- Forja do Oráculo cria e edita raças, classes, categorias de afinidade, afinidades, itens, missões, biomas, reinos, regiões, NPCs, regras, FAQ, tutorial, bestiário, mercado, leilões, crafting, conquistas, passe e reputações.
- Chat global, mensagens diretas e chat de guilda com denúncia por mensagem, emojis, jogadores online e exclusão automática para manter no máximo 60 mensagens por sala.
- Presença fica offline ao sair e também desconecta player inativo depois de cerca de 10 minutos.
- Missões, treinos, poderes, técnicas e passe premium passam pela fila de validação do Oráculo.
- Antes do RPG começar, sistemas profundos ficam bloqueados; o Oráculo pode usar `Começar RPG` para liberar a Temporada do Despertar.
- Botão de pânico desconecta players e publica alerta emergencial; modo manutenção fecha ou reabre a interface para todos exceto o Oráculo.
- Ao começar o RPG, players atuais recebem o pacote Testador Beta: título, token, 10 essências e passe premium liberado.
- Roleta 2.0 tem giro 1x/10x, pity, sons, histórico, prestígio, eventos/rate-up, proteção contra downgrade de raridade e escolha manual quando o giro 10x empata melhores afinidades.
- Invocação dimensional separada da roleta: Essência continua exclusiva para afinidade, e Millennium Coins servem para banners de pets e itens.
- Cofre invocado com pets/itens, estrelas até 7, variante Radiante, equipar, fundir duplicatas, desfazer em fragmentos e enviar para inventário/perfil sem validação manual.
- Minigames 1.0 com energia diária, dificuldades Noob até God Slayer, Prova da Mira jogável, Pet Hunt com atividades simultâneas por pet e Tower Defense estratégico com mapas temáticos originais.
- Mercado inclui vitrine, leilão, crafting, cofre e Passe da Temporada do Despertar com trilha Free e Premium até o nível 50.
- Passe agora tem aba própria no menu, hero da Temporada do Despertar, missões do passe e trilha Free/Premium.
- Tema visual de temporada 2.0: `Despertar dos Heróis` já vem com runas/brilho e a estrutura aceita Vazio, Sangue, Geada, Brasa e Natureza.
- Login foi redesenhado como tela de inicialização da Interface de Millennium, com responsividade melhor para celular.
- Favicon próprio do Millennium em `favicon.svg`.
- Música ambiente procedural com botão de ligar/desligar, sem depender de arquivo MP3 externo.
- Upload/preview de imagens usando Cloudinary para avatar, banner, itens, raças, classes, afinidades, NPCs, biomas, reinos e regiões. O Firebase salva apenas as URLs.
- Avatar e banner têm controle simples de enquadramento: centro, topo, base, esquerda ou direita.
- Perfil aceita avatar/banner por URL ou GIF, descrição pública, abas, tokens estilo badge, títulos, pets, itens, poderes, histórico e conquistas.
- Guildas custam 1.000 PO, têm limite de 10 membros, lista pública, pedidos de entrada, brasão, descrição, chat, mural, partys de até 4 players e missões próprias.
- Codex do player mostra afinidades, raridades, quantidade de donos em tempo real, raças, classes, biomas, reinos, regiões, NPCs, procurados, bestiário e facções.
- Guia inclui tutorial inicial, livro de regras por capítulos, FAQ, termo de acordo e busca global.
- Mobile tem menu inferior rolável em formato app; desktop tem menu lateral com rolagem.

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

Use `firestore.rules` como base de segurança e publique no console do Firebase depois de atualizar o site. As imagens vão para o Cloudinary usando `cloudName: cakvvuqx` e `uploadPreset: Millenium`; não é necessário ativar Firebase Storage para esta versão. O email `mrlippe78@gmail.com` está autorizado como Oráculo; a senha deve existir apenas no Firebase Authentication.
