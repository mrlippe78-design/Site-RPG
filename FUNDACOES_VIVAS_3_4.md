# Millennium 3.4 — Fundações Vivas

Esta é uma atualização completa sobre o Millennium 3.3. O pacote preserva dados existentes e não publica nada automaticamente no GitHub ou no Firebase.

## Ficha e atributos

- Os botões de atributo atualizam o campo oculto, o estado em memória e o rascunho local antes do novo render.
- A base continua exigindo exatamente 20 pontos, com cada atributo entre 2 e 6.
- O salvamento canônico da ficha ocorre primeiro em `characters/{uid}`.
- O rascunho só é removido depois da confirmação desse salvamento.
- Perfil público e nome de usuário são sincronizações secundárias; se uma delas falhar, a ficha já salva não é apresentada como perdida.
- A interface informa “Salvando ficha”, “Ficha salva” ou “Falha ao salvar · rascunho preservado”.
- Cultura e ofício personalizados agora fazem parte do patch técnico aceito pelas regras.

As chaves locais da versão 3.3 foram mantidas intencionalmente para recuperar rascunhos criados antes da atualização.

## Progressão dos minigames

Cada dificuldade de Ritual dos Selos, Cartografia Perdida, Alquimia Instável, Mira, Pet Hunt e Tower possui:

- Nível 1;
- Nível 2;
- Nível 3.

O Nível 1 começa liberado. A pontuação-alvo é exibida antes da partida; atingir o alvo libera somente o próximo nível. Melhor pontuação, níveis concluídos, histórico e chaves de idempotência são persistidos na ficha. Tempo, quantidade de elementos, velocidade, tamanho de alvo, armadilhas, ondas e resistência aumentam conforme o nível e a dificuldade.

## Afinidade, Poder e Técnicas

A cadeia canônica passa a ser:

`Afinidade → um Poder central → várias Técnicas`

- a ficha aceita apenas um Poder central aprovado;
- cada Técnica referencia esse Poder por `basePowerId`;
- um espaço de Técnica é liberado nos níveis 5, 10, 15, 20 e assim por diante;
- solicitações acima do limite são bloqueadas no player e na aprovação do Oráculo;
- todas as afinidades recebem domínio, descrição, limitações, fundação do Poder, guia de Técnicas e exemplo de uso no Codex.

## Passe ao vivo

As missões do Passe leem as atividades persistidas da ficha e as solicitações ao vivo. Há suporte a entrada, consulta ao Codex, giro de afinidade, guilda e histórico dos minigames. O progresso mostra tentativas, melhor pontuação, meta e porcentagem. Uma missão concluída pode conceder XP sazonal uma única vez por período.

## Ranking ao vivo

O Ranking e o Hall da Fama leem a coleção segura `rankings`, atualizada quando a ficha muda. A projeção contém somente os números necessários e não expõe inventários completos.

Para fichas que já existiam antes da 3.4, o Oráculo deve abrir `Temporada → Operação → Reconstruir ranking` uma vez. A ação processa até 250 fichas carregadas, remove projeções inelegíveis e registra auditoria. Depois disso, atualizações normais mantêm a classificação sincronizada.

## Música e temas

- A Jukebox oferece doze motivos sintetizados no navegador.
- A escolha fica salva no dispositivo e pode ser trocada, pausada ou avançada.
- Os dez temas possuem pacotes separados; personalizar um não contamina os demais.
- O Oráculo pode carregar o preset selecionado, editar paleta, mídia, música, estado, agenda e modo, e pré-visualizar computador e celular antes de salvar.

## Atualização emergencial

O Oráculo configura título, mensagem, ação e contagem regressiva. Ao disparar, o sistema salva formulários sujos e rascunhos de atualização antes de recarregar, entrar em manutenção ou encerrar sessões. A ação é confirmada e anunciada globalmente.

## Firestore

O novo `firestore.rules` adiciona projeções de ranking e atualizações limitadas de Passe e progressão dos minigames. Não há novos índices. Publique as regras somente depois de `npm run test:rules` passar no Firebase Emulator do computador de publicação.
