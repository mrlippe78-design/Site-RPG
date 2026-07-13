# Checklist de exclusão definitiva — Millennium 3.2.1

## Antes de excluir

- Confirme que o alvo não é o próprio Oráculo.
- Confirme que a conta não é administrativa.
- Registre um motivo objetivo.
- Verifique se o jogador lidera uma guilda.
- Transfira a liderança ou arquive a guilda.
- Digite exatamente `EXCLUIR CONTA DEFINITIVAMENTE`.

## Etapa 1 — Firestore

No painel do Oráculo, use **Excluir conta definitivamente**.

Confirme que o painel apresenta:

- UID;
- e-mail;
- quantidade de documentos removidos;
- status `Authentication pendente`.

A aplicação remove ou desvincula os dados operacionais conhecidos, preservando logs administrativos necessários para auditoria.

## Etapa 2 — Firebase Authentication

1. Abra Firebase Console.
2. Entre no projeto `sorteioafinidade`.
3. Acesse **Authentication → Users**.
4. Localize a conta pelo UID ou e-mail exibido no painel.
5. Use **Delete account**.
6. Volte ao painel do Oráculo.
7. Abra **Authentication pendente**.
8. Clique em **Conta removida do Authentication**.
9. Digite `AUTH EXCLUÍDO`.

## Validação

- O usuário não aparece em Authentication.
- O usuário não aparece na lista normal do painel.
- Não existe ficha antiga.
- A fila de exclusão não aparece mais.
- O mesmo e-mail consegue iniciar um novo cadastro.
- O novo cadastro recebe outro UID e define nova senha.

## Não faça

- Não apague apenas `users/{uid}` e declare a conta excluída.
- Não crie bloqueio permanente por e-mail.
- Não apague `auditLogs`.
- Não apague uma guilda inteira automaticamente.
- Não confirme a etapa do Authentication antes de realmente apagar a credencial.
