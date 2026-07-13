# Millennium 3.3 — Ecos da Interface

## Resultado

A versão 3.3 transforma temas sazonais em pacotes de direção visual, reorganiza a navegação do jogador e amplia a Área de Lazer sem alterar as regras narrativas, as raças originais ou a gestão de contas da versão 3.2.1.

## Hotfix de presença

`stopPresenceTracking()` chamava a si própria e provocava `RangeError: Maximum call stack size exceeded`. A função agora encerra os intervalos de presença e inatividade, zera suas referências e limpa o contador de restrição sem recursão.

## Temas de temporada

Pacotes disponíveis:

- Despertar;
- Eclipse;
- Abismo;
- Floresta Viva;
- Sangue Antigo;
- Constelação;
- Inverno Oco;
- Ferrugem;
- Pecado Partido;
- Véu Espiritual.

Cada pacote possui paleta, fundo, arte de login, textura, botões, ícones, referências de áudio, intensidade de animação, efeito de menu e destaque da Home. O Oráculo pode usar os estados Rascunho, Pré-visualização, Agendado, Ativo e Arquivado, além dos modos Cosmético, Temporada e Evento curto.

Temas em rascunho, pré-visualização ou arquivados não são aplicados aos jogadores. Um tema agendado só entra em vigor dentro da janela configurada. A prévia de celular e computador não grava nem publica mudanças.

O dourado permanece como identidade do pacote Despertar. Eclipse passa a ser a base sazonal da versão 3.3.

## Navegação

A navegação do jogador foi agrupada em:

- Obrigatório;
- Recomendado;
- Opcional;
- Lazer;
- Suporte.

A barra mobile continua com cinco atalhos e o botão Mais. Nenhuma rota anterior foi apagada.

## Área de Lazer

As abas agora são Jogos rápidos, Desafios e Recreação. Ritual dos Selos foi preservado e integrado, sem duplicação.

Novos jogos:

- Cartografia Perdida: quebra-cabeça deslizante 3×3 ou 4×4, com tabuleiro sempre solucionável, tempo e pontuação por movimentos;
- Alquimia Instável: desafio lógico de ordenação baseado em pistas, sem simular alquimia real.

As recompensas continuam pequenas e recreativas: Millennium Coins e fragmentos próprios de cada atividade. Os jogos não concedem atributos, afinidades ou pets raros diretamente.

## Preferências do jogador

Na aba Recreação, o jogador pode escolher aparência padrão ou sazonal, animações, contraste e economia de dados. Esses campos são protegidos por enumerações nas regras do Firestore.

## Arquivos centrais

- `millennium-echoes.js`;
- `echoes.css`;
- `tests/echoes.test.mjs`;
- `app.js`;
- `firestore.rules`;
- `service-worker.js`.

Nenhum dado real foi migrado e nada foi publicado automaticamente no GitHub ou Firebase.
