# Millennium 3.1 - Auditoria de Estabilidade

Data da auditoria: 2026-07-11

Etapa: Zero - auditoria e reprodução

Repositório: `mrlippe78-design/Site-RPG`

Branch de trabalho: `fix/millennium-3.1-stability`

Commit-base do `main`: `6fc92a46a47a3264e06aa4bd7be95ba2900d17e6`
Site publicado: `https://mrlippe78-design.github.io/Site-RPG/`

## Escopo desta etapa

Esta etapa não corrige a aplicação. Ela registra uma linha de base verificável antes das correções da versão 3.1.

Foram preservados:

- dados reais de players;
- estrutura atual do Firestore;
- lógica funcional já existente;
- arquivos da aplicação;
- tema e conteúdo da Temporada do Despertar.

Não foram utilizados:

- contas Firebase reais;
- dados de produção;
- migrações;
- escritas no banco real;
- integração com WhatsApp.

A exigência do prompt de testar contas reais foi substituída pela regra permanente do projeto: testes usam somente Demo Player e Demo Admin.

## Ambientes verificados

| Ambiente | Origem | Resultado |
| --- | --- | --- |
| Clone local do `main` | `http://127.0.0.1:5174/` | Abriu e executou os modos Demo |
| GitHub Pages | URL publicada | Abriu e executou os modos Demo |
| Desktop | 1280 x 720 | Sem overflow horizontal nos fluxos verificados |
| Mobile | 390 x 844 | Sem overflow horizontal, mas com problemas de foco, navegação e extensão de formulários |

## Estado de versão e publicação

- `content-v3.js` carrega antes de `app.js` no HTML.
- O Service Worker declarado no repositório é `millennium-shell-v33`.
- O clone do `main` e o GitHub Pages não entregam a mesma versão.
- O GitHub Pages entrega exatamente os arquivos da pasta local antiga.
- O `main` contém arquivos mais novos que ainda não estão publicados.
- A resposta do GitHub Pages usa `Cache-Control: max-age=600`.
- O `firestore.rules` não existe no repositório remoto.
- Seis assets referenciados pelo código retornam HTTP 404.

Arquivos publicados que diferem do `main`:

| Arquivo | Publicado | `main` |
| --- | ---: | ---: |
| `index.html` | 5.905 bytes | 6.033 bytes |
| `app.js` | 561.565 bytes | 571.398 bytes |
| `content-v3.js` | 57.279 bytes | 57.743 bytes |
| `styles.css` | 90.261 bytes | 95.092 bytes |
| `overrides.css` | 59.017 bytes | 59.804 bytes |
| `service-worker.js` | 1.659 bytes | 1.703 bytes |
| `manifest.webmanifest` | 313 bytes | 329 bytes |

Assets ausentes no clone e no site publicado:

- `assets/first-awakening-portal.png`;
- `assets/maps/arena-das-sete-esferas.png`;
- `assets/maps/reino-do-pecado-partido.png`;
- `assets/maps/sociedade-das-laminas.png`;
- `assets/pets/cronista-de-vidro.png`;
- `assets/pets/filha-da-cinza.png`.

## Resumo de severidade

| Severidade | Quantidade | Significado |
| --- | ---: | --- |
| P0 | 2 | Segurança, integridade econômica ou ausência de controle de banco |
| P1 | 11 | Função principal quebrada ou risco operacional alto |
| P2 | 5 | UX, mobile, manutenção ou comunicação |
| P3 | 0 | Refinamento puramente visual |

## Problemas registrados

### M31-001 - Regras do Firestore ausentes e economia manipulável

- Gravidade: P0.
- Tela: todas as áreas com economia, atributos, inventário, gacha e Passe.
- Dispositivo: todos.
- Passos para reproduzir: inspecionar o repositório remoto e o rascunho local de `firestore.rules`; comparar os campos permitidos ao próprio player.
- Resultado esperado: regras versionadas no repositório e validações que impeçam alteração direta de moedas, energia, fragmentos, recompensas, inventário administrativo, afinidade e estrelas.
- Resultado atual: o repositório remoto não contém `firestore.rules`. O rascunho local permite ao owner atualizar `gold`, `millenniumCoins`, `gachaEnergy`, `gachaFragments`, `gachaVault`, `inventory`, `affinityId`, `affinityAttempts`, `passClaims` e outros campos econômicos.
- Causa provável: a aplicação foi construída com economia operada no cliente e regras permissivas para manter autonomia sem uma camada transacional confiável.
- Arquivo/função: `firestore.rules`, `playerCharacterUpdateAllowed()`, `updateCharacter()`.
- Correção planejada: versionar as regras, separar comandos autorizados de edição arbitrária, validar ownership e invariantes e planejar transações seguras antes de publicar.
- Teste de regressão: tentativa autenticada de escrever moedas, energia, estrelas e atributos via cliente deve receber `permission-denied`; ações legítimas devem continuar funcionando.

### M31-002 - Reports e mensagens não possuem validação suficiente nas regras

- Gravidade: P0.
- Tela: Suporte, chat global, chat direto e denúncias.
- Dispositivo: todos.
- Passos para reproduzir: revisar os matches locais de `reports` e `directMessages`.
- Resultado esperado: `reporterId` e `senderId` iguais ao UID autenticado, participantes exatos, campos limitados, texto não vazio, tamanho máximo e status inicial imutável pelo player.
- Resultado atual: o rascunho permite criar report apenas com `signedIn()` e não valida ownership ou campos. Mensagem direta exige somente que o UID esteja em `participants`, sem validar remetente, destinatário, tamanho ou participantes exatos.
- Causa provável: regras iniciais priorizaram funcionamento do front-end.
- Arquivo/função: `firestore.rules`, matches `reports/{reportId}` e `directMessages/{messageId}`.
- Correção planejada: definir schemas permitidos e testes de Rules Emulator antes de publicação.
- Teste de regressão: falsificação de autor, alteração de status pelo player, terceiro participante e texto acima do limite devem falhar.

### M31-003 - GitHub Pages está atrás do `main`

- Gravidade: P1.
- Tela: aplicação inteira.
- Dispositivo: todos.
- Passos para reproduzir: baixar os arquivos publicados com cache-buster e comparar SHA-256 com o clone do `main`.
- Resultado esperado: o site publicado corresponde ao commit atual aprovado para deploy.
- Resultado atual: todos os nove arquivos comparados diferem do `main`; o publicado corresponde à pasta local antiga.
- Causa provável: deploy pendente, origem de Pages configurada em outra revisão ou falha na publicação.
- Arquivo/função: configuração do GitHub Pages e workflow de deploy.
- Correção planejada: confirmar fonte do Pages, adicionar verificação de commit publicado e só então promover a branch 3.1.
- Teste de regressão: exibir um identificador de build e comparar com o SHA esperado após deploy.

### M31-004 - Assets 404 quebram login, mapas e cache offline

- Gravidade: P1.
- Tela: login, Tower Defense, Codex e NPCs.
- Dispositivo: todos.
- Passos para reproduzir: acessar diretamente cada caminho em `assets/` listado neste relatório.
- Resultado esperado: HTTP 200 ou fallback explícito que não faça parte do precache obrigatório.
- Resultado atual: todos os seis caminhos retornam HTTP 404. O Service Worker inclui `assets/first-awakening-portal.png` em `cache.addAll()`, então a instalação do shell pode falhar por completo.
- Causa provável: a pasta `assets` não foi enviada ao repositório remoto.
- Arquivo/função: `service-worker.js`, `APP_SHELL`; referências em `app.js`, `content-v3.js` e CSS.
- Correção planejada: restaurar assets versionados ou substituir por URLs válidas; tornar o precache resiliente a recurso opcional ausente.
- Teste de regressão: todos os assets essenciais retornam 200 e o Service Worker chega ao estado `activated` em instalação limpa.

### M31-005 - Busca recria o DOM e fecha o teclado

- Gravidade: P1.
- Tela: Codex, Mercado e Busca do Guia.
- Dispositivo: reproduzido em desktop e no viewport mobile 390 x 844.
- Passos para reproduzir: abrir uma das buscas e preencher `fogo sombra celestial`.
- Resultado esperado: input permanece focado, cursor permanece, scroll não muda e somente resultados são atualizados.
- Resultado atual: o valor aparece, mas `document.activeElement` vira `BODY`. No Codex mobile o scroll mudou de 0 para 194 px; no desktop mudou de 0 para 41 px. O mesmo ocorreu no Mercado e na busca do Guia.
- Causa provável: handlers de `input` chamam `render()` a cada alteração.
- Arquivo/função: `app.js:9663-9671`, handlers `codex-search` e `market-search`.
- Correção planejada: inputs permanentes, debounce, tratamento de composição e atualização parcial dos resultados.
- Teste de regressão: digitar 20 caracteres rapidamente em cada busca mantendo foco, seleção e scroll.

### M31-006 - Atributos bloqueados aceitam 67 no campo e fichas corrompidas ficam presas

- Gravidade: P1.
- Tela: Personagem.
- Dispositivo: desktop e mobile.
- Passos para reproduzir: abrir Demo Player, entrar em Personagem e preencher FOR com 67.
- Resultado esperado: ficha bloqueada somente leitura; evolução por botão unitário usando Pontos de Desenvolvimento.
- Resultado atual: o input bloqueado usa `max="99"` e aceita 67 visualmente. O save válido bloqueia o total 84/20, mas um valor alto já persistido vira mínimo por `Math.max(previous, next)` e não pode ser reparado pelo player.
- Causa provável: evolução e edição da ficha compartilham o mesmo input numérico.
- Arquivo/função: `app.js:3144`, `renderCharacterForm()`; `app.js:6040-6058`, `saveCharacter()`.
- Correção planejada: steppers 2-6 na criação, leitura após lock, comando atômico de +1 e diagnóstico administrativo idempotente.
- Teste de regressão: 67/999 não entram; ficha bloqueada não reduz; +1 consome exatamente um ponto; reparo exige motivo e gera log.

### M31-007 - Afinidade principal está escondida e com nome ambíguo

- Gravidade: P2.
- Tela: navegação mobile e Início.
- Dispositivo: mobile.
- Passos para reproduzir: entrar como Demo Player em 390 x 844 e observar os seis atalhos inferiores.
- Resultado esperado: Afinidade em um toque para personagem sem afinidade; Invocação claramente separada.
- Resultado atual: a barra mostra Início, Perfil, Invocação, Chat, Missões e Mais. A função aparece no drawer como `Roleta`, em quarto lugar.
- Causa provável: `renderMobileBottomNav()` prioriza `gacha` em vez de `roulette`.
- Arquivo/função: `app.js:479-484`, `NAVS.player`; `app.js:2567-2574`, `renderMobileBottomNav()`.
- Correção planejada: renomear `Roleta` para `Afinidade`, usar atalho contextual e manter Invocação em Coleção/Mais.
- Teste de regressão: player sem afinidade chega à Revelação em um toque; de qualquer tela, no máximo dois.

### M31-008 - Criações de poderes e técnicas não possuem rota própria

- Gravidade: P1.
- Tela: Missões e navegação.
- Dispositivo: todos.
- Passos para reproduzir: entrar como Demo Player antes do início oficial e procurar Criações.
- Resultado esperado: rota `creations` independente de missão e do estado da temporada.
- Resultado atual: não existe item `creations` no menu. A página Missões mostra apenas `O chamado ainda não começou`, tornando poder e técnica inacessíveis no pré-lançamento.
- Causa provável: formulários de criação foram acoplados a `renderMissions()`.
- Arquivo/função: `NAVS.player`, `VIEW_RENDERERS`, `renderMissions()`, `submitCreationRequest()`.
- Correção planejada: criar rota própria e reutilizar `progressRequests` com validação e fila pessoal.
- Teste de regressão: enviar um poder sem missão ativa e receber exatamente uma solicitação no Oráculo.

### M31-009 - Mensagem direta faz transições e renders redundantes

- Gravidade: P1.
- Tela: Perfil e Chat direto.
- Dispositivo: principalmente mobile.
- Passos para reproduzir: abrir perfil de outro player e selecionar mensagem direta.
- Resultado esperado: uma transição para o chat e uma renderização.
- Resultado atual: `subscribePrivateChat()` altera estado e chama `render()`; o handler depois fecha o modal e chama `render()` novamente. O nome sugere subscription, mas a função apenas seleciona e filtra mensagens.
- Causa provável: responsabilidades misturadas entre seleção, subscription, modal e navegação.
- Arquivo/função: `app.js:8100-8107`, `subscribePrivateChat()`; `app.js:9516-9522`.
- Correção planejada: `openDirectConversation(userId)` com uma única transição e foco pós-render.
- Teste de regressão: dez aberturas seguidas preservam conversa, draft e scroll sem piscar.

### M31-010 - Todas as mensagens diretas são carregadas no login

- Gravidade: P1.
- Tela: login e Chat direto.
- Dispositivo: todos.
- Passos para reproduzir: revisar `subscribeCore()`.
- Resultado esperado: lista de conversas limitada e mensagens carregadas somente para a conversa aberta.
- Resultado atual: listener de `directMessages` usa `array-contains` para o usuário e `limit(200)` durante o login.
- Causa provável: modelo sem coleção de conversas.
- Arquivo/função: `app.js:2161-2165`, `subscribeCore()`.
- Correção planejada: planejar `conversations/{id}/messages`, compatibilidade temporária e paginação de 30 mensagens.
- Teste de regressão: login não lê mensagens; abrir conversa lê somente os 30 registros mais recentes dela.

### M31-011 - Reports funcionam apenas no nível básico

- Gravidade: P1.
- Tela: Reports e Denúncias do Oráculo.
- Dispositivo: todos.
- Passos para reproduzir: enviar bug no Demo Player e abrir Denúncias no Demo Admin.
- Resultado esperado: formulário completo, feedback de carregamento, ID, `Meus reports`, estados e atualização visível.
- Resultado atual: o Demo envia e limpa o formulário com toast, mas a tela possui somente título/descrição e denúncia simples. Não há lista própria, ID amigável, categorias, contexto estruturado, captura, estados ou tratamento específico de erro. O Admin mostra uma lista simples quando houver dados.
- Causa provável: implementação inicial mínima.
- Arquivo/função: `app.js:4975-5001`, `renderReports()`; `app.js:8159-8200`, `submitReport()` e `reportMessage()`.
- Correção planejada: Central de Suporte, schemas, estados e feedback assíncrono idempotente.
- Teste de regressão: player cria e vê o próprio report; outro player não vê; Admin atualiza; player recebe o novo estado.

### M31-012 - Login abre aproximadamente 52 listeners

- Gravidade: P1.
- Tela: login e todas as rotas.
- Dispositivo: todos.
- Passos para reproduzir: analisar `DEFAULT_CONTENT`, `CONTENT_COLLECTIONS` e `subscribeCore()`.
- Resultado esperado: somente usuário, personagem, settings e dados essenciais no login; subscriptions por rota.
- Resultado atual: 34 coleções de conteúdo recebem listener, além de 3 documentos e 15 coleções explícitas. Estimativa estrutural: 52 listeners iniciais. Também são carregados todos os users, characters, 200 direct messages, 500 profileViews e diversos históricos.
- Causa provável: arquitetura global única anterior ao crescimento do site.
- Arquivo/função: `app.js:2081-2213`, `subscribeCore()`.
- Correção planejada: medir antes/depois e introduzir `routeSubscriptions` gradualmente, sem migração destrutiva.
- Teste de regressão: abrir/fechar uma rota dez vezes não acumula listeners; contador ativo varia conforme a rota.

### M31-013 - Documento de personagem concentra listas crescentes

- Gravidade: P1.
- Tela: login, Perfil, Inventário, Pets, minigames e economia.
- Dispositivo: todos.
- Passos para reproduzir: revisar `defaultCharacter()` e todos os patches de `characters/{uid}`.
- Resultado esperado: documento principal pequeno e coleções crescentes paginadas.
- Resultado atual: `inventory`, `pets`, `titles`, `tokens`, `gachaVault`, `gachaHistory`, `activeActivities`, históricos e outros dados ficam no mesmo documento.
- Causa provável: modelo simples que cresceu junto com os sistemas.
- Arquivo/função: `defaultCharacter()`, `updateCharacter()`, funções de gacha, mercado e minigames.
- Correção planejada: primeiro produzir plano de dados, migrador idempotente e rollback; não mover dados nesta etapa.
- Teste de regressão: migração em cópia de teste preserva contagens, instâncias, estrelas, itens e textos; leitura antiga continua como fallback temporário.

### M31-014 - Criação de personagem é uma parede de formulário

- Gravidade: P2.
- Tela: Personagem.
- Dispositivo: mobile.
- Passos para reproduzir: abrir Personagem em 390 x 844.
- Resultado esperado: registro técnico curto e área narrativa separada `Dar Vida`.
- Resultado atual: formulário tem aproximadamente 4.693 px de altura e seis textareas narrativas junto da configuração técnica. Cultura e profissão são texto livre, não IDs de catálogo.
- Causa provável: toda a ficha foi acumulada em um único form e um único save.
- Arquivo/função: `renderCharacterForm()`, `saveCharacter()`.
- Correção planejada: planejar Registro do Escolhido e Dar Vida, drafts locais e patches parciais; nenhuma mudança de banco antes do plano de migração.
- Teste de regressão: player conclui parte técnica em poucos minutos sem história longa; narrativa preserva draft e salva somente sua seção.

### M31-015 - Menu Mais é uma lista plana extensa

- Gravidade: P2.
- Tela: drawer Mais.
- Dispositivo: mobile.
- Passos para reproduzir: abrir Mais em 390 x 844.
- Resultado esperado: grupos Jornada, Mundo, Comunidade, Coleção, Atividades e Suporte.
- Resultado atual: 19 botões sem grupo; o modal tem 824 px visíveis para 1.396 px de conteúdo.
- Causa provável: `openMoreNav()` renderiza todo `NAVS.player` em uma grade única.
- Arquivo/função: `openMoreNav()`.
- Correção planejada: adicionar metadados de grupo sem duplicar rotas.
- Teste de regressão: cada função aparece uma vez no grupo correto e Sair permanece acessível.

### M31-016 - CSS mobile está fragmentado e conflitante

- Gravidade: P2.
- Tela: aplicação inteira.
- Dispositivo: mobile.
- Passos para reproduzir: contar regras repetidas em `styles.css` e `overrides.css`.
- Resultado esperado: breakpoints consolidados e componentes com uma fonte de verdade.
- Resultado atual: existem 18 blocos separados de `@media (max-width: 760px)` e 16 usos de `!important` nos dois arquivos.
- Causa provável: correções sucessivas adicionadas ao final dos estilos.
- Arquivo/função: `styles.css`, `overrides.css`.
- Correção planejada: inventário de regras, remoção comprovada de duplicatas e testes visuais por componente.
- Teste de regressão: comparação visual desktop/mobile antes e depois, sem alterar comportamento funcional.

### M31-017 - Conteúdo-base viola o sistema narrativo oficial

- Gravidade: P1.
- Tela: Codex, ficha, bônus e passivas.
- Dispositivo: todos.
- Passos para reproduzir: procurar `x2`, `repete um teste que falhou` e `Iniciativa` em `app.js` e `content-v3.js`.
- Resultado esperado: possibilidades narrativas com limites, condições, custos e contramedidas.
- Resultado atual: foram encontradas 35 ocorrências proibidas no conteúdo-base, incluindo Humano repetindo teste, cura x2, dano x2, esquiva x2 e iniciativa x2.
- Causa provável: fallback antigo permaneceu junto ao conteúdo reforjado.
- Arquivo/função: `app.js:143-193`, `DEFAULT_CONTENT`.
- Correção planejada: substituir apenas textos, preservando IDs e conteúdos originais; definir uma única fonte-base versionada.
- Teste de regressão: busca automatizada não encontra padrões proibidos; IDs originais continuam presentes.

### M31-018 - Cultura e ofício não são sistemas catalogados

- Gravidade: P2.
- Tela: Personagem e Codex.
- Dispositivo: todos.
- Passos para reproduzir: revisar o formulário e as coleções de conteúdo.
- Resultado esperado: `cultureId` e `professionId`, catálogos explicativos e bônus processados pelo motor único.
- Resultado atual: existem apenas campos livres `culture` e `profession`; não há coleções de culturas ou ofícios.
- Causa provável: campos narrativos foram adicionados antes do sistema central de atributos.
- Arquivo/função: `renderCharacterForm()`, `saveCharacter()`, `DEFAULT_CONTENT`.
- Correção planejada: etapa própria após estabilização e plano de dados, sem apagar os campos antigos.
- Teste de regressão: valores antigos permanecem legíveis; novos registros usam IDs válidos; bônus não são duplicados.

## Fluxos que passaram no smoke test

- Login desktop e mobile sem overflow horizontal.
- Demo Player visível e funcional no clone e no publicado.
- Demo Admin visível e funcional no clone e no publicado.
- HUD mobile do Player com seis posições estáveis.
- HUD mobile do Oráculo com seis posições estáveis.
- Painel inicial do Oráculo renderiza nove indicadores.
- Report de bug em Demo Player envia, limpa o formulário e apresenta confirmação.
- Prova da Mira abre, cria alvos e oferece botão Sair.
- Invocação usa retratos procedurais quando não há arte própria.
- Perfil mobile verificado sem controles sem label, botões sem nome ou imagens sem alt na tela inspecionada.
- Nenhum erro ou warning apareceu no console durante os fluxos Demo executados.

## Testes não executados nesta etapa

- Conta Firebase real de player.
- Conta Firebase real de administrador.
- Persistência real de Reports, chat, economia e Passe.
- `permission-denied` contra as regras efetivamente publicadas no Firebase.
- Rules Emulator, pois o arquivo canônico não está no repositório remoto.
- iPhone Safari físico e Android Chrome físico; foi usado viewport 390 x 844 no navegador de testes.
- Pet Hunt e Tower Defense completos, porque o Demo Player inicial não possui pet livre.
- PWA offline em instalação limpa, bloqueada pelos assets 404.
- Migração de banco, propositalmente fora do escopo.

## Banco de dados

- Alterações de estrutura: nenhuma.
- Leituras reduzidas: nenhuma nesta etapa.
- Escritas reduzidas: nenhuma nesta etapa.
- Migração necessária agora: não executar.
- Risco de perda de dados causado por esta etapa: nenhum.
Regras a publicar agora: nenhuma nova regra foi produzida; o arquivo canônico deve primeiro ser recuperado, revisado e testado.

Riscos atuais antes da próxima etapa:

1. economia e progressão potencialmente manipuláveis;
2. regras de produção sem fonte versionada verificável;
3. publicação diferente do `main`;
4. Service Worker possivelmente incapaz de instalar o shell;
5. custo crescente de listeners e leituras;
6. documento de personagem próximo de se tornar um gargalo de tamanho e concorrência.

## Ordem recomendada das próximas etapas

Cada item deve receber instrução própria e commit separado.

1. Segurança e fonte canônica de `firestore.rules`.
2. Publicação, assets e Service Worker.
3. Busca sem render global e proteção de drafts.
4. Atributos, diagnóstico e reparo seguro.
5. Navegação Afinidade/Invocação e drawer agrupado.
6. Rota Criações.
7. Chat direto.
8. Central de Suporte.
9. Gerenciador de listeners por rota.
10. Plano de dados e migração testável, sem executar migração definitiva.
11. Registro do Escolhido e Dar Vida.
12. Motor único de atributos, culturas, ofícios e revisão textual das passivas.
13. Consolidação de CSS e refinamento visual.

## Critério para avançar

Esta auditoria deve ser revisada e aprovada antes de qualquer correção. Nenhuma próxima etapa foi iniciada automaticamente.
