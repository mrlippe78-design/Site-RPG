# Rollback — Millennium 3.4

## Site

Reverta integralmente o Pull Request da 3.4.0. Não copie arquivos isolados: `index.html`, `build-info.js`, `service-worker.js`, manifesto, scripts e CSS precisam voltar juntos para evitar cache híbrido.

Depois do rollback, confirme o badge do build anterior e faça uma recarga forçada nos dispositivos de teste.

## Firestore

Guarde uma cópia das regras anteriores antes do deploy. Se o Emulator ou a produção indicar negações inesperadas, restaure esse arquivo completo. Não apague as coleções `rankings`, nem os campos `minigameProgress`, `minigameHistory`, `passActivity` ou `passMissionClaims`: versões anteriores ignoram esses dados e eles são seguros para uma futura correção.

## Dados

A 3.4 não executa migração destrutiva. As projeções de ranking podem ser recriadas a partir das fichas. Temas ficam em `settings/system.themePackages`. Rascunhos locais mantêm as chaves compatíveis da 3.3.

## Critérios para rollback

- falha canônica ao salvar `characters/{uid}`;
- regras negando criação técnica válida;
- progressão econômica duplicada;
- projeção de ranking expondo dados além do contrato documentado;
- atualização emergencial entrando em ciclo de recarga.
