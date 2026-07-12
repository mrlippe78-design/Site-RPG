# QA Checklist 3.1 — Operação 1

## Automático

- [x] `npm test`
- [x] sintaxe de todos os scripts principais
- [x] build 3.1.0 consistente
- [x] 9 testes do motor de atributos
- [x] 5 testes da camada de estabilidade
- [x] 37 verificações browser smoke
- [x] Service Worker ativo com cache `millennium-shell-v3.1.0`
- [x] nenhum 404 local no fluxo testado

## Demo Player desktop

- [x] login Demo abre
- [x] Codex mantém foco e texto
- [x] Mercado mantém foco e texto
- [x] formulário preserva rascunho em render não crítico
- [x] valor 67 não avança a etapa de atributos
- [x] sem overflow horizontal em 1366×768

## Demo Player mobile

- [x] viewport 390×844 sem overflow
- [x] busca mantém foco lógico
- [x] input possui altura mínima de 44 px

## Demo Admin

- [x] painel de usuários abre
- [x] diagnóstico de atributos aparece
- [x] diagnóstico não modifica dados

## Antes de publicar

- [ ] testar Chrome Android real 360×800 e 412×915
- [ ] testar Safari iPhone real 390×844
- [ ] testar conexão lenta e offline manualmente
- [ ] executar `npm ci && npm run test:rules`
- [ ] revisar Pull Request e diff
- [ ] confirmar backup/rollback
- [ ] executar verificação do GitHub Pages após o merge

---

## Operação 2 — Jornada do Personagem

- [x] módulo de jornada carregado antes de `app.js`
- [x] módulo incluído no precache
- [x] doze etapas essenciais definidas
- [x] progresso derivado dos registros atuais
- [x] criação técnica separada de Dar Vida
- [x] cultura sem bônus de atributo
- [x] ofício sem bônus de atributo
- [x] busca de cultura com debounce parcial
- [x] busca de ofício com debounce parcial
- [x] rota Culturas possui renderer
- [x] rota Ofícios possui renderer
- [x] rota Criações não possui fallback silencioso
- [x] Grau de Manifestação usa motor central
- [x] Perfil de Potencial é derivado
- [x] ficha antiga pode completar origem por patch específico
- [x] 10/10 testes da Operação 2
- [x] 24/24 testes acumulados
- [ ] teste físico Android
- [ ] teste físico iPhone Safari
- [ ] revisão visual após publicação em branch de teste
## Operação 3

- [x] Criações possui rota e formulário completo.
- [x] Reenvio exige pedido de nerf e revisão sequencial.
- [x] Reports exibem protocolo e status.
- [x] Mensagens novas usam subcoleção e `clientId`.
- [x] Mensagem otimista não permanece duplicada.
- [x] Conversa carrega 30 mensagens por página.
- [x] Listeners de rota são cancelados.
- [x] Perfil privado não entra no diretório público.
- [x] Migração executada somente em dry-run anonimizado.
- [x] Testes Node aprovados: 34/34.
- [x] Smoke Chromium aprovado: 9/9.
- [ ] Firestore Rules Emulator — bloqueado pelo download do JAR.
- [ ] Teste com duas contas reais de teste.
- [ ] Teste físico em Android e iPhone.


## Operação 4 — Polimento e QA final

- [x] Codex possui cards resumidos e registro completo separado.
- [x] Codex mobile sem overflow em 390 × 844 no Chromium.
- [x] thumbnails usam lazy loading.
- [x] imagens possuem fallback determinístico por categoria.
- [x] assets críticos WebP existem e têm tamanho controlado.
- [x] modal usa diálogo acessível e contenção de foco.
- [x] Escape fecha modal.
- [x] foco retorna ao acionador após fechar.
- [x] reduced motion desativa animações contínuas.
- [x] minigames possuem ciclo de vida explícito.
- [x] Mira cancela timers ao fechar.
- [x] Hunt bloqueia resolução duplicada.
- [x] Tower possui pausa, DPR e limpeza de listeners.
- [x] diagnóstico administrativo mostra estado operacional.
- [x] 44/44 testes Node.
- [x] 18/18 verificações Chromium da Operação 4.
- [x] 0 vulnerabilidades de produção.
- [x] screenshots antes/depois gerados.
- [ ] Android físico.
- [ ] iPhone Safari físico.
- [ ] VoiceOver e TalkBack.
- [ ] Firestore Rules Emulator.
- [ ] publicação em branch de teste e validação do Pages.
