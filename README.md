# Renata Dias | Nails Master

Landing page de conversão para os atendimentos de Renata Dias, na Freguesia de
Jacarepaguá, Rio de Janeiro. A navegação direciona os agendamentos para o
WhatsApp e apresenta serviços, resultados, experiência, localização e dúvidas.

## Estrutura

- `app/page.tsx`: conteúdo, seções e links de atendimento.
- `app/globals.css`: identidade visual e regras responsivas.
- `app/MobileMenu.tsx`: navegação móvel em tela inteira.
- `app/HeaderScrollState.tsx`: estados do cabeçalho e seção ativa no desktop.
- `app/ScrollAnimations.tsx`: animações e seleção visual dos serviços.
- `public/images/`: somente imagens utilizadas pela página.
- `.openai/hosting.json`: identidade do projeto no Sites.

## Validação

- `npm run lint`: análise estática do código.
- `npm test`: build, validação do pacote e teste do HTML renderizado.
- `npm run validate:artifact`: validação isolada do pacote já gerado.

## Produção

O projeto usa Next.js/Vinext e gera um Worker compatível com o Sites. O build de
produção é executado pelo fluxo de checkpoint, que também valida o manifesto e
o ponto de entrada antes da publicação.
