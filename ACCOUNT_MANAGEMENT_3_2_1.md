# Millennium 3.2.1 — Gestão de contas

## Objetivo

Esta versão separa quatro ações que antes podiam ser confundidas:

- **Resetar ficha:** remove o personagem e o progresso da ficha, preservando a conta.
- **Suspender acesso:** bloqueia temporariamente o site, sem apagar dados.
- **Banir conta:** bloqueia até remoção manual do banimento, sem apagar dados.
- **Excluir conta definitivamente:** remove os dados do Firestore e orienta a exclusão manual no Firebase Authentication para liberar o e-mail.

## Resetar ficha

O reset remove o documento de personagem, o perfil público e as subcoleções conhecidas: lore, inventário, pets, títulos, poderes, técnicas, atividades, missões, conquistas, descobertas, histórico, desenvolvimento, recompensas e runs de minigame. Solicitações pendentes diretamente ligadas à ficha também são removidas.

A aplicação recria somente um **rascunho técnico vazio** para que o jogador possa iniciar outra ficha sem erro de carregamento. Nenhum dado do personagem anterior é reaproveitado.

São preservados:

- Firebase Authentication;
- e-mail e senha;
- `users/{uid}`;
- suspensão ou banimento existente;
- reports e auditoria administrativa.

## Suspensão

Durações disponíveis: 1 hora, 6 horas, 1 dia, 3 dias, 7 dias, 30 dias ou data personalizada.

Enquanto suspenso, o jogador vê apenas a tela de restrição, o motivo, a data de término, o contador e o botão para sair. Listeners de ficha, chat, gacha, mercado, guilda, correio e minigames são interrompidos.

A suspensão expirada é considerada inativa automaticamente, preservando o histórico administrativo.

## Banimento

O banimento não possui expiração automática. Conta, ficha, inventário, pets, mensagens, reports e progresso permanecem armazenados. O acesso retorna apenas quando o Oráculo usa **Remover restrição**.

## Exclusão definitiva

A exclusão é dividida em duas etapas:

1. Limpeza dos documentos relacionados no Firestore.
2. Exclusão manual da credencial em Firebase Console → Authentication → Users.

O site não afirma que o e-mail foi liberado antes da segunda etapa. A fila `accountDeletionQueue` impede que a sessão antiga recrie automaticamente o documento do usuário durante o intervalo entre as duas etapas. Depois que o Authentication for removido, o Oráculo confirma a conclusão e a fila é apagada.

Não é criado bloqueio por e-mail. Um novo cadastro com o mesmo e-mail terá outro UID e poderá criar uma nova senha.

## Guildas

Ao excluir uma conta que lidera uma guilda, o Oráculo deve escolher outro líder ou arquivar a guilda. A guilda não é apagada automaticamente.

## Auditoria e concorrência

As ações criam registros em `adminOperations` e `auditLogs`. Um lock transacional em `adminOperationLocks/{uid}` impede dois administradores de operar simultaneamente sobre a mesma conta. O lock expira após 15 minutos caso a sessão seja interrompida.

## Limitação sem backend

O navegador não possui permissão administrativa para apagar outro usuário do Firebase Authentication. Essa etapa precisa ser feita manualmente no Console ou, futuramente, por um backend com Firebase Admin SDK.
