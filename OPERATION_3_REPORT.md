# Millennium 3.1 — Operação 3

## Backend, comunicação e migração segura

Data da execução: 2026-07-12

Branch local: `fix/millennium-3.1-stability-op3`

Base acumulada: Operações 1 e 2.

Nenhuma alteração foi enviada ao GitHub, nenhuma regra foi publicada no Firebase e nenhum dado real foi migrado.

## Resumo executivo

A Operação 3 criou a camada de integração para Criações, Reports, mensagens diretas, listeners por rota, projeções públicas e planejamento de migração. O front-end continua compatível temporariamente com documentos legados, enquanto as novas estruturas são versionadas e testáveis sem remover arrays antigos.

## Implementações

### Poderes e Técnicas

- rota independente e formulário completo;
- campos de conceito, função, manifestação, alcance, duração, custo, limitações, contramedidas, riscos e exemplo;
- técnica exige poder-base;
- prevenção de solicitação pendente duplicada;
- estados `pendente`, `em análise`, `nerf solicitado`, `aprovado` e `reprovado`;
- reenvio controlado da mesma solicitação com número de revisão;
- aprovação administrativa grava uma projeção em `characters/{uid}/powers` ou `characters/{uid}/techniques`;
- arrays legados são mantidos para compatibilidade temporária.

### Suporte e Reports

- abas para bug, denúncia de player, denúncia de mensagem, reports próprios e FAQ;
- protocolo amigável `MR-AAAAMMDD-XXXX`;
- coleta de build, rota, viewport, navegador e user agent;
- captura de contexto limitado ao denunciar mensagem;
- status administrativos e nota do Oráculo;
- revisão administrativa vinculada a `auditLogs`.

### Mensagens diretas

Estrutura nova:

```text
conversations/{conversationId}
conversations/{conversationId}/messages/{clientId}
```

Foram adicionados:

- identificador determinístico de conversa;
- resumo das 30 conversas mais recentes;
- somente uma conversa completa aberta por vez;
- 30 mensagens por página;
- botão para carregar anteriores;
- envio otimista;
- `clientId` para impedir duplicação;
- tentativa novamente após falha;
- mensagens imutáveis após envio;
- compatibilidade temporária somente de leitura com `directMessages`.

### Listeners sob demanda

- registro separado de listeners globais e de rota;
- cancelamento ao trocar de tela;
- cancelamento do listener da conversa ao fechar ou trocar o destinatário;
- diagnóstico dos listeners ativos no Demo Admin;
- limites de leitura aplicados às listas principais.

### Perfis públicos

- criada a projeção `publicProfiles/{uid}`;
- ficha privada só pode ser lida pelo próprio usuário e pelo administrador;
- diretório comum consulta somente perfis marcados como públicos;
- projeção é atualizada nos principais salvamentos de ficha, origem, lore, privacidade e afinidade.

### Firestore

O pacote atualiza:

- `firestore.rules`;
- `firestore.indexes.json` já contém índices para conversas, reports e solicitações;
- `tests/firestore.rules.test.mjs` com cenários adicionais.

As regras cobrem:

- participantes exatos nas mensagens novas;
- mensagens imutáveis;
- reports privados ao autor;
- revisão administrativa auditada;
- reenvio de Criações somente após pedido de nerf;
- limites de XP e tamanho nas solicitações;
- projeções públicas com privacidade;
- logs administrativos imutáveis.

Essas regras não foram publicadas.

### Migração

- migrador de planejamento idempotente;
- execução apenas sobre JSON anonimizado;
- modo dry-run;
- arrays antigos preservados;
- caminhos de rollback calculados;
- marcação de `migrationVersion` sem exclusão definitiva;
- painel Demo Admin para prévia e download do plano.

## Testes executados

### Testes Node

- núcleo de atributos: 9 aprovados;
- estabilidade: 5 aprovados;
- jornada e integração da Operação 2: 10 aprovados;
- backend e integração da Operação 3: 10 aprovados.

Total: **34 aprovados, 0 falhas**.

### Chromium local

Foram validados em DOM local:

- abertura do Demo Player;
- mensagem direta sem duplicação visível;
- envio de bug e inclusão em Meus Reports;
- bloqueio explicativo de Criações antes do registro;
- painel de migração no Demo Admin;
- diagnóstico de listeners;
- rota administrativa de denúncias;
- ausência de overflow horizontal em 1366 px.

Total: **9 aprovados, 0 falhas de página e 0 erros de console**.

### Migração dry-run

A amostra anonimizada gerou:

- 1 ficha analisada;
- 4 operações propostas;
- 0 escritas realizadas;
- arrays antigos preservados;
- rollback gerado.

### Dependências

`npm audit --omit=dev` encontrou **0 vulnerabilidades de produção**.

### Firebase Rules Emulator

O comando foi executado, mas os testes das regras não chegaram a iniciar porque o ambiente não conseguiu baixar `cloud-firestore-emulator-v1.21.0.jar` do Google Storage. Portanto, as regras foram revisadas e os casos de teste foram escritos, mas não são declarados como aprovados no emulador.

## Bugs corrigidos

- rota Criações sem fluxo operacional;
- reenvio de criação antiga usando revisão incorreta;
- duplicação visual de mensagem otimista e confirmada;
- múltiplos renders no início da conversa direta;
- ausência de paginação nas mensagens diretas novas;
- reports sem protocolo e contexto técnico;
- revisão de report sem trilha de auditoria;
- listeners de coleções grandes permanentes fora das rotas;
- perfis privados legíveis pela projeção pública;
- regras rejeitando campos legítimos de mercado e missão de guilda;
- mensagem nova com participantes diferentes do resumo da conversa;
- solicitações de mercado tentando declarar XP.

## Pendências

- publicar e validar regras em um projeto Firebase de teste;
- executar os testes no Firestore Emulator;
- testar mensagens reais entre duas contas autenticadas;
- executar migração somente após backup e comparação de contagens;
- substituir completamente as leituras legadas de `directMessages` após período de transição;
- migrar inventário, pets, títulos, poderes e técnicas em produção;
- testes físicos em Android e iPhone;
- operação de polimento do Codex, CSS, acessibilidade e minigames.

## Riscos conhecidos

- enquanto recompensas econômicas forem administradas pelo cliente, a proteção depende de regras, aprovação do Oráculo e auditoria;
- publicar regras sem Emulator pode bloquear fluxos antigos não mapeados;
- remover arrays legados antes da validação quebraria telas ainda em transição;
- consultas novas exigem os índices versionados no pacote.
