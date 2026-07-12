# Estabilidade dos minigames — Millennium 3.1

## Máquina de estados

Estados oficiais:

- `idle`;
- `preparing`;
- `running`;
- `paused`;
- `resolving`;
- `completed`;
- `cancelled`;
- `failed`.

Transições inválidas são recusadas pelo módulo `millennium-polish.js`.

## Prova da Mira

- sessão possui identificador próprio;
- timers são registrados e cancelados;
- fechar modal encerra a sessão;
- alvos possuem área mínima de toque e rótulo;
- HUD usa `aria-live`;
- recompensa possui chave de conclusão;
- repetição da mesma chave é recusada;
- melhor sequência é calculada corretamente.

## Pet Hunt

- resolução usa bloqueio por atividade;
- botão é desativado durante coleta/cancelamento;
- chave de conclusão evita resolução repetida;
- estado é liberado mesmo em falha.

## Tower Defense

- sessão possui ciclo de vida explícito;
- pausa e retomada;
- Canvas ajustado para `devicePixelRatio`;
- coordenadas lógicas independentes do tamanho físico;
- listener de resize removido ao encerrar;
- timers e `requestAnimationFrame` cancelados;
- recompensa possui chave de conclusão.

## Limitação de segurança

Essas proteções reduzem duplicações acidentais e tentativas simples no cliente. Elas não tornam recompensas econômicas invioláveis. Sem backend confiável, a solução segura continua sendo combinar regras do Firestore, transações, logs, limites e aprovação administrativa para recompensas relevantes.
