# Validação — Millennium 3.2.1

## Resultados locais

- Build e cache: 3.2.1 consistentes.
- Testes Node: 67 aprovados, 0 falhas.
- Chromium local: 23 verificações aprovadas, 0 falhas.
- Erros de página: 0.
- Erros internos de console: 0.
- Vulnerabilidades de dependências de produção: 0.

## Cobertura específica

Os testes verificam:

- durações de suspensão;
- expiração automática;
- bloqueio de autoação administrativa;
- confirmação obrigatória;
- fila de exclusão sem bloqueio permanente do e-mail;
- cobertura das subcoleções da ficha;
- separação visual das quatro ações;
- tela de restrição;
- bloqueio das funções comuns nas regras;
- lock transacional por conta;
- regressões de ficha, afinidade, Criações, gacha, correio e minigames.

## Firestore Emulator

O comando `npm run test:rules` foi iniciado, mas o ambiente não conseguiu baixar `cloud-firestore-emulator-v1.21.0.jar`. As regras não são declaradas aprovadas pelo Emulator.

Antes de publicar em produção, execute no computador:

```bash
npm ci
npm run test:rules
```

Publique `firestore.rules` somente depois de o Emulator finalizar sem falhas.
