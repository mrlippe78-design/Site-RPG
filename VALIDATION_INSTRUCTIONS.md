# Instruções de validação

## 1. Testes locais

```powershell
npm test
py -m http.server 5173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:5173`.

## 2. Demo Player

1. clique em `Demo Player`;
2. abra Codex e digite rapidamente;
3. confirme que o campo continua focado;
4. abra Mercado e repita;
5. abra Personagem;
6. avance até Atributos;
7. confirme que existem somente botões `−` e `+`;
8. altere um campo anterior e espere uma atualização: o texto não deve desaparecer.

## 3. Demo Admin

1. clique em `Demo Admin`;
2. abra Players/Usuários;
3. confirme o painel `Diagnóstico de ficha`;
4. confirme que o diagnóstico não possui ação de reparo.

## 4. Service Worker

DevTools → Application → Service Workers:

- estado `activated`;
- cache `millennium-shell-v3.1.0`;
- sem recursos locais 404 no Network.

## 5. Firestore

Não publique nesta etapa. Para testar localmente:

```powershell
npm ci
npm run test:rules
```

Somente após testes verdes, backup e revisão independente considere uma publicação separada das regras e índices.
