# Millennium 3.6.3 — Sentinela do Oráculo

Esta atualização adiciona uma camada intermediária de integridade para uma comunidade pequena, preservando a edição Firebase Spark e sem excluir ficha, inventário, pets ou histórico.

## O que foi implementado

- recibo imutável e único para cada alteração econômica da própria ficha;
- atualização atômica de ficha, recibo e snapshot legítimo;
- validação de valores absolutos e deltas nas regras do Firestore;
- coleção `securityIncidents` para alertas e decisões do Oráculo;
- quarentena econômica automática de 60 minutos para anomalias relevantes;
- suspensão automática de 6 horas apenas para anomalia crítica ou reincidência;
- recurso interno do jogador em `securityAppeals`;
- painel de revisão do Oráculo;
- restauração do último snapshot econômico legítimo;
- preservação integral da conta e dos dados do personagem.

## Coleções novas

| Coleção | Finalidade | Exclusão pelo cliente |
|---|---|---|
| `economyReceipts` | Registro imutável do antes/depois de cada operação | Bloqueada |
| `securitySnapshots` | Último estado econômico considerado legítimo | Bloqueada |
| `securityIncidents` | Alertas de integridade e decisões administrativas | Bloqueada |
| `securityAppeals` | Recurso do jogador em análise | Bloqueada |

## Ativar o App Check

A chave pública do reCAPTCHA Enterprise já foi inserida em `millennium-security-config.js`.

1. Abra o Firebase Console do projeto `sorteioafinidade`.
2. Entre em **App Check** e confirme que a aplicação Web está registrada com **reCAPTCHA Enterprise**.
3. Confirme que os domínios usados pelo Millennium estão autorizados.
4. Publique o pacote atualizado do site.
5. Verifique no painel do App Check se as solicitações válidas estão aparecendo.
6. Somente depois do período de observação, habilite a exigência do App Check para o Cloud Firestore. Ative outros produtos gradualmente.

Configuração aplicada:

```js
appCheckProvider: "recaptcha-enterprise",
appCheckSiteKey: "configurada",
```

Não coloque chaves privadas, secrets ou credenciais administrativas nesse arquivo. A site key do reCAPTCHA é uma identificação pública do cliente.

## Publicar as regras

No pacote Firebase, execute no Windows:

```text
ATUALIZAR_FIREBASE_3_6_3_SEGURANCA.bat
```

O script publica somente as regras e os índices do Firestore. Não instala Cloud Functions e não apaga documentos.

## Fluxo de resposta

### Alteração normal

A ficha, o recibo e o snapshot são gravados juntos. Se uma dessas três partes não puder ser validada, nada é confirmado.

### Anomalia alta

A alteração econômica é rejeitada, um incidente é registrado e a economia fica em quarentena por 60 minutos. Chat, leitura, ficha e recurso continuam disponíveis.

### Anomalia crítica ou reincidência

A alteração é rejeitada e a conta fica suspensa por 6 horas para revisão. Nenhum dado é apagado.

### Divergência com o snapshot

Ao entrar, o sistema compara a economia atual com o último snapshot legítimo. Quando encontra uma divergência sem auditoria administrativa correspondente, registra o incidente, restaura o snapshot e aplica a quarentena adequada.

## Revisão pelo Oráculo

O painel de segurança permite:

- liberar o jogador;
- restaurar o snapshot legítimo;
- confirmar a infração;
- estender a suspensão por 6 horas;
- marcar como bug ou falso positivo;
- consultar o recurso enviado pelo jogador.

## Limite técnico

Esta é uma defesa proporcional ao Millennium e à comunidade prevista. Ela dificulta alterações manuais, cria rastreabilidade e bloqueia saltos impossíveis. Não substitui um backend autoritativo: um cliente muito avançado ainda pode tentar reproduzir operações legítimas, por isso o App Check, as regras, os recibos e a revisão humana trabalham em conjunto.
