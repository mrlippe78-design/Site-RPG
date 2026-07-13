# Operação Millennium 3.2.1 — Resumo executivo

## Entrega

A gestão administrativa foi dividida em reset de ficha, suspensão, banimento e exclusão definitiva. O fluxo preserva dados durante moderação e só libera o e-mail após remoção manual no Firebase Authentication.

## Arquivos principais

Criados:

- `millennium-account-management.js`;
- `account-management.css`;
- `tests/account-management.test.mjs`;
- `tests/account-management.integration.test.mjs`;
- documentação 3.2.1.

Modificados:

- `app.js`;
- `firestore.rules`;
- `index.html`;
- `service-worker.js`;
- arquivos de build;
- scripts e testes de regressão.

## Segurança

- usuário comum não altera status de moderação;
- conta restrita acessa somente o próprio status e configurações necessárias;
- administrador não opera sobre a própria conta;
- conta administrativa não pode ser alvo desse painel;
- confirmação e motivo são obrigatórios;
- operações têm idempotency key, auditoria e lock transacional;
- exclusão não cria tombstone permanente por e-mail.

## Limitações

- exclusão do Authentication permanece manual;
- remoção definitiva não possui restauração automática;
- regras ainda precisam ser validadas no Firebase Emulator local.
