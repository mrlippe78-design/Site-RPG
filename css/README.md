# Design System — Millennium 3.7.0

A pasta `css/` preserva a base 3.6.4 e recebe a camada isolada `millennium-3.7.0.css` como extensão canônica do Mundo Vivo.

## Ordem

1. `tokens.css`: paleta, tokens semânticos e aliases legados.
2. `reset.css`: normalização de baixa especificidade.
3. `typography.css`: escala e utilitários tipográficos.
4. `layout.css`: primitivas de composição.
5. `components.css`: componentes reutilizáveis novos.
6. `charts.css`: base SVG/CSS para gráficos locais.
7. `responsive.css`: breakpoints e utilitários responsivos.
8. `accessibility.css`: foco, movimento reduzido e alto contraste.
9. `themes/`: sobrescritas semânticas por contexto.

O CSS legado continua carregado antes desta camada. As folhas estruturais usam `@layer` para não vencer seletores antigos por acidente. `tokens.css` e `accessibility.css` ficam fora de camadas porque devem normalizar variáveis e garantias mínimas.

## Regra de migração

Componentes novos devem usar `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--duration-*` e `--z-*`. Variáveis antigas como `--gold`, `--blue`, `--muted` e `--panel` são aliases temporários e não devem aparecer em novos componentes.
