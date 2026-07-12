# Validação — Operação 4

## 1. Instalação e testes

```bash
npm ci
npm test
```

Resultado esperado:

```text
44 testes aprovados
0 falhas
build 3.1.0 consistente
```

## 2. Teste Chromium local reproduzível

Requer Python, Playwright e Chromium:

```bash
python scripts/browser_smoke_op4.py
```

Resultado esperado:

```text
18 verificações aprovadas
0 falhas de página
0 erros internos de console
```

## 3. Validação manual

Sirva a pasta do projeto:

```bash
python -m http.server 5173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:5173`.

### Demo Player

1. Abra o Codex.
2. Selecione Afinidades.
3. Confirme cards compactos e botão “Abrir registro”.
4. Abra um registro.
5. Use Tab dentro do modal.
6. Pressione Escape.
7. Confirme que o foco volta ao botão original.
8. Abra Minigames e inicie a Prova da Mira.
9. Feche antes do fim e confirme que a sessão não continua.

### Demo Admin

1. Abra Operações.
2. Localize Estado da Interface.
3. Confirme build, rota, renders, listeners, imagens e minigames.
4. Baixe o diagnóstico JSON.

## 4. Responsividade

Validar manualmente:

- 320 × 568;
- 360 × 800;
- 390 × 844;
- 412 × 915;
- tablet;
- 1366 × 768;
- 1920 × 1080.

## 5. Antes da publicação

- revisar o diff;
- testar Android real;
- testar iPhone real;
- executar Firestore Emulator;
- não executar migração destrutiva;
- publicar em branch/PR;
- validar GitHub Pages e Service Worker;
- somente depois publicar regras e índices no Firebase.
