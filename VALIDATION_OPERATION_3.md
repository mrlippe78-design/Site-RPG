# Validação local — Operação 3

## 1. Preparação

```bash
npm ci
npm test
```

Resultado esperado: 34 testes aprovados.

## 2. Abrir o site

```bash
python -m http.server 5173
```

Abra `http://127.0.0.1:5173`.

## 3. Demo Player

### Mensagens diretas

1. Abra Chat.
2. Selecione Direto.
3. Abra uma conversa.
4. Envie uma mensagem.
5. Confirme que ela aparece uma vez.
6. Confirme que o botão Carregar anteriores aparece quando houver mais de 30 mensagens.

### Reports

1. Abra Reports.
2. Envie um bug.
3. Confirme o protocolo `MR-...`.
4. Abra Meus Reports.
5. Confirme que o registro aparece com status.

### Criações

1. Use uma ficha técnica concluída.
2. Abra Criações.
3. Envie um poder completo.
4. Confirme que uma proposta com mesmo nome não pode ser duplicada enquanto pendente.
5. Como Oráculo, marque `nerf solicitado`.
6. Reenvie e confirme o incremento da revisão.

## 4. Demo Admin

1. Abra Operações.
2. Gere a prévia de migração.
3. Confirme que nenhuma escrita é executada.
4. Abra Denúncias.
5. Altere o status e registre uma nota.
6. Confirme que a ação usa auditoria.

## 5. Migração anonimizada

```bash
npm run plan:migration -- qa/operation3-migration-sample.json migration-dry-run.json
```

O comando deve gerar somente um plano JSON. Não usa credenciais e não escreve no Firebase.

## 6. Regras do Firestore

Somente em um ambiente de teste com o emulador instalado:

```bash
npm run test:rules
```

Não publique as regras no projeto real antes de esse comando passar.

## 7. Publicação posterior

Ordem recomendada:

1. criar branch nova;
2. enviar código e documentação;
3. publicar índices;
4. testar regras no Emulator;
5. publicar regras em ambiente de teste;
6. testar duas contas reais de teste;
7. somente depois considerar produção.
