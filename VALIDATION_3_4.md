# Validação — Millennium 3.4

## Resultado desta cópia

- build, manifesto, cache e referências em 3.4.0: aprovados;
- sintaxe JavaScript e Service Worker: aprovada;
- testes Node da aplicação: 79 aprovados, 0 falhas;
- auditoria estrutural de CSS: aprovada;
- testes específicos de progressão, afinidades, Jukebox, Passe, ranking e salvamento: aprovados;
- Firebase Emulator: não executado neste ambiente, pois `npm ci` recebeu pacotes corrompidos repetidamente e não concluiu a instalação;
- teste visual Chromium: não executado neste ambiente.

As regras não devem ser declaradas aprovadas até o Emulator terminar no computador de publicação.

## Validação obrigatória antes da publicação

Dentro de `source`:

```bash
npm ci
npm test
npm run test:rules
```

Depois, inicie um servidor estático:

```bash
python -m http.server 5173
```

Verifique em desktop e celular:

1. criar uma conta descartável e distribuir os atributos com `+` e `−`;
2. recarregar no meio da ficha e confirmar a recuperação do rascunho;
3. salvar a ficha e confirmar “Ficha salva”;
4. concluir Nível 1 de uma dificuldade e confirmar o desbloqueio do Nível 2;
5. conferir uma afinidade no Codex e a cadeia Poder/Técnicas;
6. cumprir e coletar uma missão do Passe;
7. abrir Ranking e Hall da Fama com duas fichas elegíveis;
8. como Oráculo, executar “Reconstruir ranking” uma vez;
9. alternar trilhas da Jukebox;
10. carregar dois presets de tema e confirmar que as personalizações ficam separadas;
11. disparar uma atualização emergencial de recarga com uma conta descartável e um formulário sujo.

## Ordem segura de ativação

1. executar todos os testes acima na cópia extraída;
2. enviar a branch pelo publicador e revisar o Pull Request;
3. com o Emulator aprovado, publicar `firestore.rules` em uma janela de manutenção;
4. concluir o merge do site 3.4.0;
5. limpar cache/recarregar e confirmar o badge `Build 3.4.0`;
6. executar “Reconstruir ranking” uma vez;
7. testar primeiro com contas descartáveis.

Nada deste pacote executa deploy do Firebase, merge ou migração automaticamente.
