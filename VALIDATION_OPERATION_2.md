# Validação manual — Operação 2

## Preparação

```bash
npm ci
npm test
python -m http.server 5173
```

Abra `http://127.0.0.1:5173`.

## Demo Player novo

1. Abra Demo Player.
2. Aceite os termos, quando solicitado.
3. Na Home, confirme `Seu Primeiro Despertar` com progresso de doze etapas.
4. Abra `Personagem`.
5. Confira a introdução antes da ficha.
6. Percorra as sete etapas.
7. Selecione raça e classe e confirme bônus separados.
8. Abra `Culturas` e `Ofícios` pelos botões de comparação.
9. Volte à ficha e confirme que o rascunho permaneceu.
10. Distribua exatamente 20 pontos.
11. Conclua o registro.
12. Abra `Dar Vida`, preencha dois campos e confirme progresso parcial.
13. Abra `Criações` e confirme que a rota não retorna à Home.
14. Abra `Culturas` e pesquise `juramento`.
15. Abra `Ofícios` e pesquise `anatomia`.
16. Confira Grau de Manifestação e Perfil de Potencial no Perfil.

## Ficha antiga

1. Use uma ficha bloqueada sem cultura ou ofício.
2. Abra `Personagem`.
3. Localize `Complete a origem sem alterar sua base`.
4. Salve reino, região, cultura e ofício.
5. Confirme que base, raça e classe permaneceram iguais.

## Mobile

Validar em 360, 390, 412 e 430 px:

- sem overflow horizontal;
- Home com uma ação principal;
- cards de catálogo em uma coluna;
- modal de detalhes fechável;
- barra de manifestação legível;
- campos com teclado aberto sem perda de rascunho;
- botões com área mínima adequada.

## Antes de publicar

- criar branch separada;
- revisar diff;
- não publicar `firestore.rules` junto com esta operação;
- não executar migração;
- validar Demo Player e Demo Admin;
- confirmar rollback do frontend.
