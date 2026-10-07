# Acessibilidade para Todos

Protótipo com duas telas em HTML, CSS e JavaScript, sem instalação de dependências.

## Abrir

Abra `acessibilidade.html` no navegador. Ela é a tela inicial e tem links para `painel.html`. Você também pode usar o Live Server no VS Code. Para testar preferências persistentes entre páginas de forma consistente, prefira Live Server: o comportamento de localStorage em arquivos file:// varia por navegador.

## Telas

- `acessibilidade.html`: apresentação do sistema, tipos de acessibilidade e ajustes rápidos.
- `painel.html`: configurações e texto de demonstração.

## Recursos

- Texto de 90% a 150%, em passos de 10%.
- Alto contraste.
- Espaçamento entre letras (0,12em), palavras (0,16em) e linhas.
- Leitura para dislexia: Verdana, alinhamento à esquerda e entrelinhas ampliadas. É opcional; conforto varia e o recurso não trata dislexia.
- Ler e parar: usa as vozes oferecidas pelo navegador. A tela inicial narra o conteúdo; o painel narra a demonstração. A disponibilidade de voz em português varia.
- Restaurar: texto de 100%, desativa os três modos e para a fala.
- Preferências compartilhadas entre as telas, quando localStorage estiver disponível.
- Idioma pt-BR, link para pular conteúdo, títulos hierárquicos, foco visível, botões com estado anunciado e navegação por teclado.
- Layout responsivo, sem recursos externos ou envio de dados.

## Editar

Edite textos nos HTML, estilos em `css/style.css` e comportamentos em `js/script.js`. Não há recursos de Libras nem reconhecimento de comandos de voz: esses temas são exemplos informativos, não funções implementadas.

## Verificação

Foram verificados os controles, os limites de tamanho, a restauração, a persistência e o fluxo de leitura por testes de DOM com voz simulada. Esses testes não substituem a revisão em navegadores reais e com tecnologias assistivas. O protótipo não declara certificação de conformidade WCAG.
