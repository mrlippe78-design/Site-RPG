# FIRESTORE SECURITY 3.2

## Alterações

As regras mantêm o documento de personagem fechado por padrão e liberam somente mutações delimitadas para:

- roleta de afinidade;
- confirmação de correio;
- início e conclusão de Pet Hunt;
- resultado de minigames, incluindo Ritual dos Selos;
- invocação de gacha com gasto limitado e entre 1 e 10 recompensas;
- manutenção limitada do cofre;
- recuperação de pet mediante gasto limitado;
- resposta do player a uma proposta do Oráculo;
- administração auditada e remoção de registros de teste.

## Limite de segurança

O projeto não possui backend confiável para calcular recompensas. Regras do Firestore limitam campos, tamanhos e variações, mas não conseguem provar que um resultado aleatório calculado no navegador é legítimo. Recompensas altas, únicas ou econômicas sensíveis devem permanecer sob aprovação administrativa ou migrar futuramente para Cloud Functions/servidor confiável.

## Testes

Os testes de regras foram atualizados para gacha e Pet Hunt. A execução automática do Emulator não terminou neste ambiente porque o arquivo oficial do Firestore Emulator não pôde ser baixado. O log foi preservado em `qa/firestore-rules-emulator-3.2.log`.

Antes de publicar as regras em produção, execute:

```bash
npm run test:rules
```
