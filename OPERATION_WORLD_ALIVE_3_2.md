# MILLENNIUM 3.2 — OPERAÇÃO MUNDO VIVO

## Entrega

A versão 3.2.0 acumula as correções 3.1, 3.1.1 e 3.1.2 e executa a prioridade central da Operação Mundo Vivo.

## Implementado

- motor único de atributos em player, perfil, admin e ranking;
- composição detalhada dos cinco atributos;
- compatibilidade por nome/ID para equipamentos antigos;
- `affinitySnapshot` apenas histórico;
- banner de pets global com rotação horária e contador;
- 25 pets com artes WebP dedicadas e exclusivas;
- 18 localidades com artes WebP dedicadas e exclusivas;
- fallback SVG exclusivo para os demais pets sem ilustração dedicada;
- classes Caçador, Guardião, Feiticeiro e Monge;
- formulário de Criações simplificado para o player;
- análise, balanceamento e aprovação final controlados pelo Oráculo;
- correções de permissão e idempotência em Pet Hunt, minigames, afinidade e correio;
- gacha persiste o resultado antes da revelação;
- probabilidades públicas, pool e histórico;
- Ritual dos Selos;
- melhoria de cards, vazios, responsividade e safe area;
- sons sintetizados por raridade e música ambiente opcional já integrada;
- build/cache 3.2.0 e Service Worker atualizado.

## Não concluído nesta versão

- ilustração manual completa para todos os 91 pets: 66 continuam com sigilo exclusivo;
- biblioteca de faixas musicais externas por cidade: nenhuma música de terceiros foi incluída;
- backend confiável para validar resultados econômicos;
- Diário de Descobertas, Memórias de Cidade e Bestiário progressivo completos;
- testes físicos com Safari iOS, TalkBack e VoiceOver;
- execução concluída do Firestore Emulator.

Esses itens foram mantidos fora do núcleo para não atrasar as correções de produção nem aumentar o risco sobre dados reais.

## Arquivos principais

- `millennium-world-alive.js`
- `world-alive.css`
- `app.js`
- `millennium-core.js`
- `millennium-backend.js`
- `firestore.rules`
- `service-worker.js`
- `tests/world-alive.test.mjs`
- `tests/firestore.rules.test.mjs`
- `assets/pets/`
- `assets/maps/`
