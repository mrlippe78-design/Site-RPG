# VALIDATION 3.2

## Testes locais

```bash
npm ci
npm test
python scripts/browser_smoke_op4.py
npm audit --omit=dev
```

Resultados obtidos:

- 58 testes Node aprovados;
- 23 verificações Chromium aprovadas;
- 0 erros de página;
- 0 erros internos de console;
- 0 vulnerabilidades de produção;
- build e cache sincronizados em 3.2.0;
- imagens hero mapeadas sem hashes repetidos;
- nenhum WebP de pet/mapa acima de 500 KB.

## Firestore Emulator

O comando foi iniciado, porém o ambiente não conseguiu baixar `cloud-firestore-emulator-v1.21.0.jar`. Portanto, as regras não são declaradas aprovadas pelo Emulator nesta entrega.

## Homologação recomendada

1. Publicar a branch pelo publicador incluso.
2. Criar e revisar o Pull Request.
3. Fazer merge após os checks.
4. Confirmar build 3.2.0 no site.
5. Executar `npm run test:rules` em uma máquina com acesso ao download do Emulator.
6. Publicar o novo `firestore.rules`.
7. Testar com conta beta: atributos, gacha 1x/10x, correio, Pet Hunt, Tower, Ritual dos Selos e Criações.
8. Liberar primeiro para poucos jogadores.
