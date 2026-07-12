# Auditoria de acessibilidade — Millennium 3.1

## Implementado

- link “Pular para o conteúdo principal”;
- `main` focável;
- foco visível com `:focus-visible`;
- alvos interativos mínimos de 44 × 44 px nas regras novas;
- campos com fonte mínima de 16 px;
- modais com `role="dialog"`, `aria-modal`, título associado e foco inicial;
- contenção de Tab dentro do modal;
- Escape fecha modal;
- foco retorna ao acionador após fechar, inclusive quando a tela é renderizada novamente;
- Codex com `tablist`, `tab`, `tabpanel` e navegação por setas/Home/End;
- imagens com texto alternativo e fallback;
- atualizações importantes com `aria-live`;
- instruções ocultas para a Prova da Mira;
- `prefers-reduced-motion` reduz partículas, rotações e transições;
- `prefers-contrast: more` reforça linhas e texto.

## Testes automáticos e Chromium

- modal abre e fecha por teclado;
- foco retorna ao botão do Codex;
- reduced motion remove animação contínua;
- Codex não apresenta overflow em 390 × 844;
- diagnóstico administrativo não apresenta overflow em 1366 × 768.

## Limitações

- não houve auditoria completa com leitor de tela real;
- não houve teste físico no VoiceOver/iOS ou TalkBack/Android;
- rotas legadas ainda podem conter labels ou ordens de tabulação incompletas;
- contraste precisa de revisão manual em todas as artes e estados raros.
