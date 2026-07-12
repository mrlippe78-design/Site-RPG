# Segurança do Firestore — Millennium 3.1

## Estado

As regras estão versionadas, mas não foram publicadas pelo processo desta entrega.

## Proteções centrais

- o player não altera economia, afinidade, pets, itens, títulos ou função administrativa;
- atributos iniciais exigem exatamente 20 pontos, entre 2 e 6;
- desenvolvimento consome um ponto por operação;
- reports pertencem ao autor e revisão exige auditoria;
- mensagens diretas são imutáveis;
- conversa nova exige dois participantes distintos;
- participantes da mensagem precisam corresponder ao resumo da conversa;
- Criações só podem ser reenviadas após pedido de nerf e com revisão sequencial;
- solicitações têm tamanho, party e XP limitados;
- perfil privado só é visível ao dono e ao administrador;
- logs administrativos não podem ser reescritos ou apagados.

## Compatibilidade

`directMessages` permanece com leitura e criação protegidas para a transição. O novo front-end não cria novos documentos nessa coleção; novas mensagens usam `conversations/{id}/messages/{id}`.

## Testes escritos

`tests/firestore.rules.test.mjs` cobre:

- fraude econômica;
- atributo 67;
- isolamento de personagens;
- reports falsificados;
- mensagens legadas;
- conversas atômicas;
- participantes forjados;
- reenvio controlado de criação;
- autoaprovação;
- XP forjado em mercado;
- party acima do limite;
- privacidade de perfil;
- auditoria administrativa.

## Limitação de validação

O Emulator não foi executado nesta entrega porque o ambiente não conseguiu baixar o JAR oficial. As regras não devem ser publicadas antes de o teste passar em outro ambiente.

## Ordem de deploy

1. backup das regras atuais;
2. `firebase emulators:exec`;
3. publicação de índices em ambiente de teste;
4. publicação das regras em ambiente de teste;
5. teste com duas contas de player e uma de admin;
6. produção somente após validação.
