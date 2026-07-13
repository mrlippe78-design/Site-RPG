# Rollback — Millennium 3.3

## Código

Reverta o Pull Request da versão 3.3.0 e confirme que GitHub Pages voltou ao build 3.2.1. Não copie arquivos isolados: `index.html`, `build-info.js`, `service-worker.js`, `manifest.webmanifest`, scripts e folhas de estilo precisam voltar juntos para evitar cache híbrido.

## Firestore

A versão adiciona permissões limitadas para preferências visuais do usuário e registros dos dois novos minigames. Antes de publicar regras, preserve uma cópia da versão ativa.

Se for necessário reverter:

1. restaure o `firestore.rules` anterior;
2. execute `npm run test:rules` no Emulator;
3. publique somente após aprovação;
4. não remova campos existentes dos documentos dos jogadores — a versão anterior simplesmente os ignora.

Não há migração destrutiva, índice novo nem exclusão automática de dados.
