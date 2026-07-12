# Plano de migração 3.1

## Objetivo

Mover listas crescentes do documento principal para subcoleções sem apagar os arrays antigos durante a versão de transição.

## Estrutura-alvo

```text
characters/{uid}/inventory/{instanceId}
characters/{uid}/pets/{instanceId}
characters/{uid}/titles/{titleId}
characters/{uid}/powers/{powerId}
characters/{uid}/techniques/{techniqueId}
characters/{uid}/activities/{activityId}
```

## Etapas

1. exportar backup do Firestore;
2. gerar relatório anonimizado de esquema e contagens;
3. executar `plan:migration` sobre uma amostra;
4. revisar colisões de IDs;
5. criar documentos ausentes com `upsert-if-missing`;
6. comparar quantidade e campos essenciais;
7. marcar `migrationVersion: 3` e `migrationState: prepared`;
8. manter `legacyArraysPreserved: true`;
9. ler primeiro a estrutura nova e usar a antiga como fallback;
10. observar uma versão completa antes de qualquer remoção.

## Idempotência

O plano usa IDs estáveis e uma chave `uid:migration:3`. Fichas com versão 3 ou superior são ignoradas. Reexecutar o planejamento não cria novos IDs.

## Modo de teste

```bash
npm run plan:migration -- export-anonimizado.json migration-dry-run.json
```

Esse comando não inicializa Firebase e não executa escritas.

## Validação

Para cada ficha, comparar:

- quantidade por coleção;
- IDs e nomes;
- propriedade `ownerId`;
- equipamento ativo;
- estrelas e raridade;
- poderes e técnicas aprovados;
- atividades em andamento.

## Proibição nesta operação

- não apagar arrays antigos;
- não executar migração em produção;
- não alterar dados reais;
- não marcar versão concluída sem comparação de contagens.
