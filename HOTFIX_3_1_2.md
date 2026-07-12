# Millennium 3.1.2 — Admin, Ranks e Criações

## Classes

A Forja do Oráculo continua sendo a fonte dinâmica da coleção `classes`.
Uma classe salva passa a aparecer automaticamente no Codex, na criação de personagem,
nos seletores administrativos e no motor de atributos. O painel também informa a
quantidade de fichas ligadas a cada classe.

## Rankings

Os rankings agora usam fichas registradas e elegíveis, sem depender de
`profilePublic`. Privacidade continua ocultando os detalhes do perfil, mas não apaga
a colocação do personagem.

O prestígio é recalculado por:

- giros registrados;
- raridades obtidas;
- nível atual;
- PO registrado.

O campo de prestígio manual foi removido do formulário administrativo.

## Exclusão administrativa

O painel de usuários oferece:

- apagar somente a ficha;
- remover o player do sistema.

A remoção completa cria um registro em `deletedUsers`, limpa documentos conhecidos
e bloqueia a recriação automática do perfil. Administradores e a própria conta do
Oráculo não podem ser excluídos por esse painel.

A exclusão da credencial no Firebase Authentication continua manual.

## Poderes e técnicas

Fluxo novo:

1. Player envia a ideia.
2. Oráculo marca em análise.
3. Oráculo redige a versão balanceada.
4. Player aceita ou aponta contradição.
5. Oráculo aprova ou reprova definitivamente.
6. Somente a versão final do Oráculo entra na ficha.

O player não edita status, não aplica nerf e não se autoaprova.

## Firebase

O arquivo `firestore.rules` foi atualizado para:

- permitir a resposta controlada do player;
- impedir reescrita livre da criação;
- permitir exclusões administrativas;
- bloquear recriação de usuários removidos;
- permitir que o Oráculo leia registros necessários à limpeza.

## Validação

- sintaxe JavaScript: aprovada;
- consistência do build 3.1.2: aprovada;
- 51 testes locais: aprovados;
- Firestore Emulator: não executado neste ambiente.
