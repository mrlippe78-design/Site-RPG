# Millennium 3.1.1 — Hotfix Beta

## Corrigido

- Giros de afinidade voltam a persistir no Firestore.
- Essências passam a ser descontadas junto do giro aprovado.
- A escolha posterior do giro 10x pode ser salva.
- O correio pode ser marcado como recebido pelo dono da ficha.
- Prova da Mira volta a salvar energia, moedas, fragmentos e histórico.
- Alvos da Prova da Mira aparecem imediatamente e recebem reforço de visibilidade em navegadores Android.
- A mensagem de permission-denied agora aponta para o Hotfix 3.1.1.

## Limitação de segurança

Sem backend confiável, sorteios e recompensas calculados no navegador não são invioláveis. As regras limitam quantidade de giros, tamanho dos históricos, energia e crescimento de moedas, mas o beta deve continuar monitorado.

## Publicação

1. Publique os arquivos no GitHub por branch e Pull Request.
2. Aguarde o GitHub Pages mostrar Build 3.1.1.
3. Copie o novo `firestore.rules` para o Firebase e publique.
4. Não é necessário alterar os índices.
5. Refaça os testes com uma conta beta.
