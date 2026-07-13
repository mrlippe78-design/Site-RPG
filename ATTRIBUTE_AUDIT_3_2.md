# ATTRIBUTE AUDIT 3.2

## Origem da divergência

A ficha do player, o painel administrativo e algumas telas antigas apresentavam o total por caminhos diferentes. Equipamentos antigos podiam não ser encontrados pelo ID atual, e `affinitySnapshot` aparecia como alerta mesmo sendo apenas um registro histórico.

## Fonte única

Todas as telas passam a usar `MILLENNIUM_CORE_31.calculateCharacterStats(character, catalogs, context)`.

A função separa:

- base;
- desenvolvimento;
- raça;
- classe;
- afinidade;
- equipamentos;
- efeitos temporários;
- penalidades;
- total;
- derivados;
- diagnósticos.

A fórmula oficial é:

`TOTAL = BASE + DESENVOLVIMENTO + RAÇA + CLASSE + AFINIDADE + EQUIPAMENTOS + EFEITOS - PENALIDADES`

DEF permanece derivada e não é atributo-base.

## Compatibilidade

Itens antigos são procurados por `instanceId`, `catalogId`, `itemId`, `sourceId`, `id`, nome normalizado e slug. `Espada Curta` recebeu entrada oficial de compatibilidade. O mesmo item equipado não é contado duas vezes.

`affinitySnapshot` é preservado para histórico, mas nunca soma bônus. O aviso agora é informativo, não uma inconsistência grave.

## Fixture validada

Para base 4/4/4/4/4, Demônio, Guerreiro e Afinidade Tempo, o resultado oficial é:

- FOR 9
- VEL 5
- HAB 5
- RES 5
- POD 6

O teste é executado no motor central e no smoke test de interface.
