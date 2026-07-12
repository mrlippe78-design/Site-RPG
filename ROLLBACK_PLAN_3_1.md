# Plano de rollback 3.1

## Código

Voltar para o commit anterior à Operação 3 ou remover:

- `millennium-backend.js`;
- `backend.css`;
- referências correspondentes no HTML e Service Worker;
- alterações da Operação 3 em `app.js`.

## Firestore Rules

Guardar a versão atualmente publicada antes de qualquer deploy. Caso a nova regra bloqueie um fluxo legítimo, republicar a versão anterior e registrar o incidente.

## Mensagens

A nova estrutura não apaga `directMessages`. Durante o rollback, a aplicação pode voltar a ler a coleção legada. Documentos em `conversations` permanecem preservados para uma tentativa posterior.

## Criações

`progressRequests` continua sendo a fonte do fluxo de aprovação. As projeções em subcoleções podem ser ignoradas temporariamente, pois os arrays legados continuam presentes.

## Migração

Cada plano dry-run contém:

- caminhos de documentos criados;
- versão anterior;
- patch de retorno;
- indicação explícita de que arrays legados não foram removidos.

Rollback de uma migração validada:

1. interromper novas escritas;
2. comparar os documentos criados com o plano;
3. remover somente os caminhos listados no rollback;
4. restaurar `migrationVersion` anterior;
5. marcar `migrationState: rolled-back`;
6. manter os arrays antigos intactos;
7. validar a ficha antes de liberar o acesso.

Nenhum rollback automático é executado pelo pacote.

## Rollback específico da Operação 4

1. reverter os commits locais da Operação 4 em ordem inversa;
2. restaurar `app.js`, `index.html`, CSS, Service Worker e scripts a partir do pacote da Operação 3;
3. remover `millennium-polish.js`, `polish.css` e assets adicionados somente pela Operação 4;
4. limpar caches do Service Worker após restaurar a revisão anterior;
5. executar `npm test` do pacote restaurado;
6. não alterar regras, índices ou documentos do Firebase durante esse rollback.
