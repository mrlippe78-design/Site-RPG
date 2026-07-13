# Validação — Millennium 3.3

## Resultados locais

- Build e cache 3.3.0 consistentes.
- Verificação de sintaxe aprovada.
- 72 testes Node aprovados.
- 0 testes Node com falha.
- Auditoria CSS concluída.
- Referências locais de assets verificadas.
- Recursão de `stopPresenceTracking()` coberta por teste de regressão.
- Pacotes visuais, Cartografia Perdida e Alquimia Instável cobertos por testes unitários e de integração estática.

## Limitações do ambiente

O teste Chromium existente não iniciou porque o módulo Python `playwright` não está instalado neste ambiente. Isso não foi declarado como aprovação visual.

As regras modificadas precisam ser executadas no Firebase Emulator antes da publicação. Não publique `firestore.rules` sem executar:

```bash
npm ci
npm run test:rules
```

A tentativa neste ambiente não chegou ao Emulator: `npm ci` foi interrompido pelo cache restrito/corrompido do npm. Portanto, as regras não estão sendo declaradas aprovadas.

## Checklist manual antes do merge

1. Abrir Demo Player no celular e no computador.
2. Confirmar os grupos Obrigatório, Recomendado, Opcional e Lazer.
3. Abrir Área de Lazer e testar as três abas.
4. Concluir Ritual dos Selos, Cartografia Perdida e Alquimia Instável.
5. Fechar cada jogo durante a partida e confirmar ausência de timers ou erros no console.
6. Abrir Demo Admin → Temporada.
7. Pré-visualizar cada tema em celular e computador.
8. Confirmar que um tema em Rascunho não aparece para o player.
9. Confirmar que um tema Agendado respeita início e término.
10. Testar logout, suspensão e troca de conta, verificando que não existe `Maximum call stack size exceeded`.

Nenhuma conta real deve ser usada nesses testes.
