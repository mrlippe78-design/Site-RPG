# Rollback — Gestão de contas 3.2.1

## Código

Caso a interface apresente regressão, reverta o Pull Request da versão 3.2.1 no GitHub e confirme que o GitHub Pages voltou ao build anterior.

## Regras do Firestore

Antes de publicar as regras 3.2.1, copie as regras atuais do Firebase para um arquivo local. Em caso de bloqueio indevido:

1. Firebase Console → Firestore Database → Rules.
2. Restaure o conteúdo anterior.
3. Publique.
4. Teste uma conta comum e uma conta administrativa.

## Suspensão ou banimento incorreto

No documento `users/{uid}`, restaure por meio do painel do Oráculo:

- `accountStatus: active`;
- `suspendedUntil: null`;
- motivo vazio.

Use **Remover restrição** para manter o registro de auditoria.

## Lock administrativo preso

Locks normais expiram após 15 minutos. Caso um lock permaneça incorreto, um administrador pode remover `adminOperationLocks/{uid}` após confirmar que nenhuma operação ainda está em andamento.

## Exclusão do Firestore iniciada por engano

A exclusão definitiva do Firestore não possui restauração automática. Não confirme nem execute a exclusão no Firebase Authentication. Restaure os documentos somente a partir de backup ou exportação válida.

## Authentication apagado por engano

A exclusão de uma credencial no Firebase Authentication não pode ser desfeita diretamente. O usuário precisará criar uma nova conta, recebendo novo UID e nova senha. Dados antigos só podem ser associados novamente por operação administrativa cuidadosamente auditada.
