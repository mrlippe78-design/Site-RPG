# Millennium 3.1 — Operação 2: Jornada do Personagem

## Base

Esta operação continua sobre a entrega acumulada da Operação 1. Nenhum dado real foi lido ou migrado. Nenhuma regra foi publicada no Firebase e nenhuma alteração foi enviada ao GitHub.

## Escopo executado

- criação técnica em sete etapas;
- separação entre `Registrar o Escolhido` e `Dar Vida`;
- jornada guiada de doze etapas essenciais;
- modo de player novo orientado por progresso real;
- Home reorganizada em `Hoje em Millennium`;
- catálogos navegáveis de culturas e ofícios;
- busca e filtros parciais para os catálogos;
- detalhes de cultura e ofício sem sair da rota;
- complementação de origem para fichas antigas sem alterar atributos;
- Grau de Manifestação e Perfil de Potencial derivados do motor central;
- rota segura de introdução a Poderes e Técnicas para eliminar a navegação quebrada;
- novos testes de jornada e integração estática.

## Implementação

### Registro técnico

A ficha técnica continua dividida em:

1. identidade;
2. herança;
3. formação;
4. origem;
5. atributos;
6. aparência mínima;
7. revisão.

A base permanece limitada a exatamente 20 pontos, com mínimo 2 e máximo 6. Cultura e ofício não adicionam atributos.

### Dar Vida

`Dar Vida` permanece em rota e formulário próprios. O progresso é calculado por uma função pura em `millennium-journey.js`. O preenchimento narrativo não produz bônus de combate.

### Jornada guiada

Foram estabelecidas doze etapas essenciais. O progresso é derivado dos registros atuais e não depende apenas de um botão de tutorial. A Home mostra uma única ação principal correspondente à próxima etapa incompleta.

### Culturas e ofícios

Foram adicionadas rotas explícitas:

- `cultures`;
- `professions`.

Cada rota possui busca, filtro, resumo, palavras-chave e registro detalhado. O formulário técnico continua aceitando opções oficiais, `Outro` e `Sem ofício`.

### Compatibilidade com fichas antigas

Fichas já bloqueadas que não possuem reino, região, cultura ou ofício recebem um formulário opcional de complementação. Esse formulário usa patch específico e não envia base, raça ou classe.

### Grau e potencial

O Grau de Manifestação e o Perfil de Potencial são derivados de:

- atributos oficiais calculados;
- nível;
- prestígio;
- missões aprovadas;
- poderes aprovados;
- técnicas aprovadas.

Esses indicadores são informativos e não decidem cenas automaticamente.

## Arquivos principais criados

- `millennium-journey.js`;
- `journey.css`;
- `tests/journey.test.mjs`;
- `tests/operation2.integration.test.mjs`;
- `OPERATION_2_REPORT.md`;
- `VALIDATION_OPERATION_2.md`.

## Arquivos principais modificados

- `app.js`;
- `index.html`;
- `service-worker.js`;
- `scripts/check-build-consistency.mjs`;
- `package.json`;
- `README.md`;
- `CHANGELOG_3_1.md`;
- `QA_CHECKLIST_3_1.md`;
- `MIGRATION_PLAN_3_1.md`;
- `ROLLBACK_PLAN_3_1.md`;
- `BUG_AUDIT_3_1.md`.

## Testes executados

Comando:

```bash
npm test
```

Resultados:

- motor central: 9/9;
- estabilidade e debounce: 5/5;
- jornada e integração da Operação 2: 10/10;
- total: 24/24;
- verificação de build: aprovada;
- sintaxe dos scripts principais: aprovada.

Também foram verificados por HTTP local, com resposta 200:

- `index.html`;
- `app.js`;
- `millennium-core.js`;
- `millennium-journey.js`;
- `catalogs-3.1.js`;
- `journey.css`;
- `service-worker.js`.

## Limitações da validação

- não houve teste físico em Android ou iPhone;
- não houve escrita em Firestore real;
- não houve execução do Firebase Rules Emulator;
- não houve migração;
- a oficina completa de Criações e o fluxo administrativo ficam para a operação de backend e comunicação;
- screenshots reais devem ser produzidos após publicação em branch de teste.

## Bugs corrigidos

- rota `creations` sem renderer;
- Grau de Manifestação existente no núcleo, mas ausente da interface;
- Perfil de Potencial não exibido;
- onboarding linear sem refletir progresso real;
- culturas e ofícios sem rotas próprias de consulta;
- ficha antiga sem caminho seguro para completar origem;
- Home sem próximo passo essencial claramente priorizado.

## Bugs restantes

- fluxo completo de envio, nerf e aprovação de Criações;
- mensagens diretas e reports completos;
- regras do Firebase ainda precisam ser testadas e publicadas separadamente;
- listeners e paginação ampla;
- migração para subcoleções;
- consolidação geral de CSS legado;
- validação completa dos minigames;
- testes reais multi-dispositivo.
