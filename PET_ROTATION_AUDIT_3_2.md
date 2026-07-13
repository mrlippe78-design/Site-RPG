# PET ROTATION AUDIT 3.2

## Problema observado

O banner anterior dependia da renderização da página, não mostrava uma contagem regressiva estável e podia aparentar permanecer igual por várias horas. Isso era mais visível quando o banner administrativo estava ativo ou quando o pool de raridades altas era pequeno.

## Implementação 3.2

- Rotação global determinística por hora: `floor((agora + ajusteServidor) / 3600000)`.
- Todos os jogadores no mesmo período recebem a mesma seleção.
- Seis destaques sem duplicação interna.
- Seleção equilibrada entre raridades disponíveis.
- Complemento por raridade adjacente quando um grupo não possui pets suficientes.
- Proteção contra composição exatamente igual à hora anterior quando existe alternativa.
- Contador `MM:SS` atualizado a cada segundo sem renderizar a tela inteira.
- Atualização automática na virada da hora, preservando scroll e modais.
- Timer cancelado ao sair da rota.
- Banner do Oráculo só substitui a rotação quando `rotationMode` é explicitamente `fixed`.
- Painel administrativo mostra modo automático/fixo, banner atual, próxima hora e pool.

## Validação

Os testes confirmam que a mesma hora gera a mesma composição, a hora seguinte gera uma composição diferente e nenhum pet se repete dentro do banner. O smoke test confirmou a contagem regressiva visível no mobile.

## Limitação conhecida

A seleção é calculada no navegador. Ela é consistente e verificável, mas não constitui um sorteio secreto de servidor. O resultado individual do gacha continua sendo persistido no Firestore antes da animação final.
