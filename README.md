# Millennium RPG Support

Plataforma web de suporte para Millennium RPG com Firebase Auth + Firestore.

## Rodar local

```powershell
py -m http.server 5173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:5173`.

## O que mudou

- Tela de login/cadastro com Firebase Auth.
- Área Player separada da Área Admin.
- Player: perfil público/privado, ficha, roleta de afinidade, inventário, chat, missões e reports.
- Admin: painel de controle, inspeção/edição de fichas, envio de prêmios, títulos, pets, PO, essências, itens e afinidades.
- Admin usa a Forja para criar raças, classes, categorias de afinidade, afinidades, categorias de item, itens, missões, biomas, reinos, regiões e NPCs.
- Chat global, sussurro e privado.
- Reports de bug e denúncia de player.
- Aviso global, temporada e temas de cores.
- Missões semanais com reset de segunda 00:00 quando um Admin abre o painel.
- Ganhos raros geram anúncio no chat global.
- Roleta 2.0 com giro 1x/10x, pity configurável, sons, histórico, prestígio e banner de evento/rate-up.
- Grimório do player com títulos equipáveis, pets, itens em vitrine e histórico dos últimos giros.
- Ranking da mesa por prestígio, raros e nível.
- Correio místico do Admin para enviar pacotes, essências, títulos, itens, afinidades e mensagens para um player ou todos.
- Presentes pendentes aparecem na home do player até ele marcar como recebido.
- XP e nível agora dependem de aprovação do Admin em missões, treinos, poderes e técnicas.
- Player escolhe missão, marca como concluída e envia treino/criação para validação.
- Admin tem aba de Validações para aprovar XP/recompensas, reprovar ou pedir nerf em poder/técnica.
- Diário de Campanha para eventos oficiais do Admin e memórias dos personagens.
- Chat global separado de mensagem direta, com título do player, perfil clicável, jogadores online e denúncia por mensagem.
- Mensagem direta em formato de lista lateral, com amigos, jogadores online e atalho para abrir perfil.
- Perfis privados mostram apenas foto, nome do player, nome do personagem, título ativo e botão de amizade.
- Correio no perfil para pedidos de amizade, convites de guilda e presentes enviados pelo Admin.
- Sistema de guildas: criar custa 1.000 PO, limite de 10 membros, lista pública de guildas, pedido de entrada, líder edita brasão/nome/descrição, convida/remove membros, conversa no chat da guilda e monta partys de até 4 jogadores.
- Missões de guilda têm raridade alta, recompensas maiores, envio para aprovação do Admin e reset semanal junto das missões comuns.
- Admin consegue abrir e administrar guildas sem precisar ser membro.
- Codex do player com afinidades, raridades, contagem de players por afinidade, raças, classes, biomas, reinos, regiões e NPCs em tempo real.
- Formulários de ficha e edição de player mantêm rascunho local para não resetar quando chegam snapshots do Firebase.
- Chat direto ordena mensagens no cliente, mostra erro de permissão quando o Firestore bloquear e tem botões rápidos de emoji.
- Ficha base trava raça, classe e redução de atributos depois do primeiro salvamento.
- Novos temas visuais e som leve de clique nos botões.
- Tela inicial recebeu fonte medieval legível, título maior, card de login centralizado e sem aviso fixo de email Admin quando o Firebase está ativo.
- Home do player agora mostra notícias em tempo real, players online, ranking compacto e visualizações de perfil.
- Forja do Admin permite editar conteúdos existentes por JSON.
- Admin tem botão de pânico para desconectar players e publicar alerta emergencial.
- Poderes usam slots controlados pelo Admin; técnicas dependem de poder base aprovado.
- Perfil aceita avatar/banner por URL ou GIF e descrição pública do personagem.
- Modo app mobile com menu inferior fixo, cards compactos e textos menos empilhados.
- Dashboard do player ganhou próximos passos, tutorial, status rápido, notificações e acesso ao termo.
- Perfil agora tem abas de visão geral, itens, pets, poderes, histórico e conquistas.
- Codex ganhou busca, filtros, ordenação, quadro de procurados, bestiário e facções.
- Guia do player inclui tutorial inicial, livro de regras por capítulos, FAQ, termo e busca global.
- Hall da Fama mostra rankings por prestígio, nível, raros e guildas.
- Mercado inclui vitrine, leilão, crafting, cofre pessoal e passe de temporada.
- Guildas mostram nível, reputação e mural editável pelo líder.
- Admin ganhou Operações com auditoria, economia, balanceamento, modo manutenção e versão do termo.
- Admin pode mutar/suspender players; denúncias de mensagem agora incluem contexto.
- Forja épica permite criar/editar regras, FAQ, tutorial, procurados, bestiário, mercado, leilões, crafting, técnicas, conquistas, passe e reputações.

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
- `reputationFactions/{id}`
- `reports/{id}`
- `progressRequests/{id}`

## Regras

Use `firestore.rules` como base de segurança. O primeiro Admin pode ser criado pelo app se o projeto estiver aberto para bootstrap; depois disso, recomendo publicar regras e ajustar o campo `role: "admin"` diretamente no documento `users/{uid}` do Admin no console do Firebase.

## Admin inicial

O email `mrlippe78@gmail.com` está autorizado no frontend e nas regras Firestore como Admin. A senha não fica no código; ela deve existir apenas no Firebase Authentication.
