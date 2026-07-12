# Auditoria de CSS — Millennium 3.1

Data: 2026-07-12

## Resultado

A Operação 4 centralizou as novas regras de polimento em `polish.css`, reduziu referências externas de arte nos estilos e adicionou uma auditoria reproduzível em `scripts/audit-css.mjs`.

O legado não foi reescrito integralmente nesta operação. A remoção indiscriminada de seletores antigos teria risco alto de regressão em rotas que ainda não possuem testes visuais completos.

## Medição automática

| Arquivo | Seletores | Repetições internas | `!important` | Media queries |
|---|---:|---:|---:|---:|
| `styles.css` | 2613 | 277 | 15 | 20 |
| `overrides.css` | 936 | 189 | 1 | 14 |
| `journey.css` | 138 | 24 | 3 | 3 |
| `backend.css` | 37 | 3 | 0 | 1 |
| `polish.css` | 133 | 12 | 14 | 4 |

Duplicações cruzadas detectadas: **108**.

O relatório bruto está em `qa/operation4-css-audit.json`.

## Consolidação aplicada

- tokens específicos da Operação 4;
- foco visível e alvos de toque;
- Codex resumido e responsivo;
- modal e safe areas;
- Canvas do Tower Defense;
- painel de diagnóstico;
- preferências de movimento e contraste;
- posição segura do controle de música;
- fallbacks visuais consistentes.

## Dívida restante

- consolidar progressivamente `styles.css` e `overrides.css` por componente;
- remover seletores mortos após cobertura visual de todas as rotas;
- reduzir `!important` herdados;
- normalizar breakpoints antigos;
- evitar conversão em massa sem comparação visual.
