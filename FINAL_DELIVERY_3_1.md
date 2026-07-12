# Entrega final local — Millennium 3.1 Reforja Total

## Estado

As quatro operações foram acumuladas no mesmo projeto:

1. base estável, foco, busca, atributos, build e cache;
2. personagem, Dar Vida, culturas, ofícios, onboarding e manifestação;
3. Criações, reports, mensagens, regras, listeners e migração dry-run;
4. Codex, assets, acessibilidade, minigames, diagnóstico e QA.

## Testes acumulados

- Node: 44/44;
- Chromium Operação 4: 18/18;
- vulnerabilidades de produção: 0;
- migrações reais: 0;
- publicações no Firebase: 0;
- merges no GitHub: 0.

## Publicação recomendada

1. criar uma branch baseada no `main` atual;
2. copiar o conteúdo do diretório `project` ou aplicar os patches;
3. executar `npm ci && npm test`;
4. revisar assets e diff;
5. abrir Pull Request;
6. publicar o site em ambiente de teste;
7. executar validação mobile/desktop;
8. testar Firestore Emulator;
9. publicar índices e regras separadamente;
10. manter rollback pronto.

## Declaração de limites

O pacote não declara segurança econômica absoluta no navegador. Recompensas valiosas precisam de backend confiável ou aprovação administrativa. Também não substitui testes físicos de Safari/iOS, Chrome/Android, VoiceOver e TalkBack.
