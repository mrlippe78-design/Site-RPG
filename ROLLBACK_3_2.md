# ROLLBACK 3.2

## Código

Reverta o Pull Request da versão 3.2.0 ou restaure o commit anterior da `main`. Não apague os assets manualmente antes de restaurar `index.html`, `service-worker.js` e `build-info.js`, pois o cache precisa permanecer consistente.

## Firestore

Antes de publicar as regras 3.2, salve uma cópia das regras atuais. Em caso de bloqueio generalizado:

1. Firebase Console → Firestore Database → Rules.
2. Restaurar o conteúdo anterior.
3. Publicar.
4. Não apagar índices existentes.

## Dados

A operação não executa migração destrutiva, não remove fichas e não reescreve os catálogos personalizados. As quatro novas classes são mescladas por ID de forma idempotente.
