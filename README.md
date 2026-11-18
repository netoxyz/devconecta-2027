# DevConecta 2027

> **Projeto acadêmico e fictício.** O DevConecta 2027 não é um evento real. Palestrantes, empresas,
> programação e inscrições são demonstrativos e foram criados exclusivamente para fins de estudo.

Landing page de um evento acadêmico de tecnologia, desenvolvida para a disciplina de
**Desenvolvimento de Interfaces** com HTML5, CSS3 e JavaScript puro (sem frameworks e sem backend).

**🔗 Site publicado:** _adicione aqui o link do GitHub Pages_ (ex.: `https://<usuario>.github.io/devconecta-2027/`)

---

## Sumário

- [Descrição](#descrição)
- [Objetivo geral](#objetivo-geral)
- [Funcionalidades implementadas](#funcionalidades-implementadas)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como executar localmente](#como-executar-localmente)
- [Como funciona o LocalStorage](#como-funciona-o-localstorage)
- [Publicação no GitHub Pages](#publicação-no-github-pages)
- [Como alterar o conteúdo](#como-alterar-o-conteúdo)
- [Limitações conhecidas](#limitações-conhecidas)
- [Créditos](#créditos)

---

## Descrição

O **DevConecta 2027** é um evento acadêmico fictício sobre programação, inteligência artificial,
inovação e desenvolvimento de software. Ele acontece em **17 e 18 de junho de 2027**, em **Brasília - DF**,
com abertura às **9h (horário de Brasília)**.

A landing page apresenta o evento, sua programação e seus palestrantes. Ela também permite simular uma
inscrição, que gera um comprovante com código único e fica salva apenas no navegador do visitante.

A interface segue a aparência de um site profissional de conferência de tecnologia:

- tema escuro em azul-marinho;
- detalhes em azul elétrico, ciano e roxo;
- cards modernos e animações suaves;
- layout responsivo.

## Objetivo geral

Desenvolver uma landing page **moderna, interativa, acessível e responsiva**, utilizando apenas
tecnologias nativas da web e publicável gratuitamente no GitHub Pages. O projeto aplica, na prática:

- estruturação semântica com HTML5;
- organização de estilos com variáveis CSS (*design tokens*) e abordagem *mobile-first*;
- JavaScript modular (ES Modules), com separação entre **dados** e **comportamento**;
- persistência de dados no navegador com LocalStorage;
- boas práticas de acessibilidade e usabilidade.

## Funcionalidades implementadas

### Navegação
- Navbar fixa: começa transparente e ganha fundo com efeito de vidro (*glassmorphism*) ao rolar a página.
- Menu hambúrguer no celular e no tablet:
  - abre e fecha com animação;
  - fecha ao clicar em um link, ao clicar fora ou ao pressionar **Esc**;
  - atualiza `aria-expanded`.
- **Scroll spy:** destaca na navbar o link da seção visível (`IntersectionObserver`).
- Rolagem suave, com compensação da altura da navbar fixa.

### Hero
- Título com destaque em gradiente, descrição, data e local, e botões de chamada para ação.
- **Contagem regressiva em tempo real** (dias, horas, minutos e segundos) até 17/06/2027 às 09:00 (UTC-3):
  - o horário de início é definido com fuso explícito (`-03:00`), então funciona igual em qualquer fuso
    horário do visitante;
  - quando chega a zero, exibe uma mensagem informando que o evento começou.
- Ilustração decorativa em SVG (chip com trilhas de circuito animadas) e formas geométricas flutuantes
  feitas em CSS.
- Indicadores do evento: 2 dias, 4 trilhas e 12+ atividades.

### Sobre o evento
- Texto de apresentação e objetivos.
- Quatro cards das áreas do evento, com ícones SVG e efeito ao passar o mouse.
- Animações de entrada ao rolar a página (*reveal*).

### Programação interativa
- 12 atividades fictícias, 6 por dia.
- **Abas** para alternar entre os dias, também com navegação pelas setas do teclado.
- **Filtros por categoria:** Inteligência Artificial, Desenvolvimento Web, Inovação e Tecnologia, e
  Carreira e Mercado.
- Linha do tempo gerada dinamicamente a partir de `js/data/schedule.js`.

### Palestrantes
- Quatro palestrantes fictícios, com avatar de iniciais feito em CSS (sem imagens externas).
- Cada card mostra o cargo, a empresa, a especialidade, o tema da palestra e uma biografia.
- Os dados dos cards são os mesmos da programação.

### Inscrição (demonstração)
- Campos:
  - nome completo, e-mail, instituição e curso;
  - semestre;
  - trilha de interesse;
  - aceite dos termos.
- **Validação em tempo real** com mensagens claras, foco no primeiro campo inválido e feedback visual.
- Validação básica de e-mail e exigência de nome e sobrenome.
- **Bloqueio de inscrição duplicada** pelo e-mail, sem diferenciar maiúsculas, minúsculas ou espaços.
- **Código único** por inscrição, no formato `DC27-XXXXXX`.
- **Comprovante** com o nome, a trilha e o código. Ele é exibido novamente ao recarregar a página.
- Notificações (*toasts*) de sucesso e de erro.
- Aviso visível de que se trata de uma **demonstração acadêmica**.

### FAQ
- Sete perguntas frequentes em acordeão:
  - apenas uma fica aberta por vez;
  - a abertura tem transição suave;
  - um indicador visual mostra o estado (+ / −).

### Footer
- Logotipo, descrição, links para as seções, data e local, direitos reservados e identificação do projeto
  acadêmico.

### Acessibilidade e responsividade
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`) e link "Pular para o conteúdo".
- Foco visível e navegação completa por teclado.
- Atributos ARIA no menu, nas abas, nos filtros, no acordeão e nas mensagens do formulário.
- Respeito à preferência do sistema **"reduzir movimento"** (`prefers-reduced-motion`).
- Layout testado em 1280px, 768px, 390px e 320px, sem rolagem horizontal.
- Sem JavaScript, o conteúdo estático continua visível. Programação e palestrantes exibem um aviso
  pedindo para ativá-lo.

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica e acessível |
| **CSS3** | Variáveis CSS, Grid, Flexbox, animações, `clamp()`, `color-mix()` e `:has()` |
| **JavaScript (ES Modules)** | Interatividade, renderização a partir de dados, validação e LocalStorage |
| **SVG** | Ícones, ilustração do Hero e favicon |
| **Google Fonts** | Space Grotesk (títulos), Inter (texto) e JetBrains Mono (detalhes técnicos) |

Não há frameworks, bibliotecas, backend, banco de dados, processo de build nem dependências para
instalar.

## Estrutura de pastas

```
devconecta-2027/
├── index.html              # Página única com as 8 seções
├── README.md
├── .nojekyll               # Faz o GitHub Pages servir os arquivos sem processamento Jekyll
├── assets/
│   └── icons/
│       └── favicon.svg
├── css/
│   ├── variables.css       # Design tokens: cores, tipografia, espaçamentos, sombras
│   ├── base.css            # Reset, tipografia, botões, container, foco acessível
│   ├── layout.css          # Seções, navbar, menu mobile, footer
│   ├── components.css      # Componentes reutilizáveis (cards, abas, chips, formulário, toast...)
│   ├── sections.css        # Estilos específicos de cada seção
│   └── animations.css      # Keyframes e animação de entrada ao rolar
└── js/
    ├── main.js             # Ponto de entrada: inicializa os módulos
    ├── data/               # Conteúdo (edite aqui para mudar textos)
    │   ├── schedule.js     # Categorias e atividades da programação
    │   ├── speakers.js     # Palestrantes
    │   └── faq.js          # Perguntas frequentes
    └── modules/            # Comportamento (um arquivo por funcionalidade)
        ├── navbar.js       # Navbar, menu mobile e scroll spy
        ├── countdown.js    # Contagem regressiva (data do evento centralizada aqui)
        ├── reveal.js       # Animações de entrada ao rolar
        ├── schedule.js     # Abas e filtros da programação
        ├── speakers.js     # Renderização dos cards de palestrantes
        ├── form.js         # Validação, envio e comprovante
        ├── storage.js      # Única camada de acesso ao LocalStorage
        ├── faq.js          # Acordeão
        └── toast.js        # Notificações
```

## Como executar localmente

O projeto usa **ES Modules**. Por segurança, os navegadores bloqueiam módulos JavaScript em páginas
abertas direto do disco (`file://`). **Não abra o `index.html` com duplo clique:** use um servidor local.

**Opção 1: VS Code + Live Server (recomendada)**
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` e escolha **"Open with Live Server"**.

**Opção 2: Python**

Na pasta do projeto, rode:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

**Opção 3: Node.js**

Na pasta do projeto, rode:

```bash
npx serve .
```

## Como funciona o LocalStorage

> As inscrições são **apenas demonstrativas**. Nenhum dado é enviado a servidores. Tudo fica salvo
> **somente no navegador** de quem preencheu o formulário.

Todo acesso ao LocalStorage está concentrado em `js/modules/storage.js`. O site usa duas chaves, com
prefixo próprio para evitar conflitos:

| Chave | Conteúdo |
|---|---|
| `devconecta2027:inscricoes` | Lista (JSON) com todas as inscrições feitas neste navegador |
| `devconecta2027:ultima-inscricao` | Código da última inscrição, usado para reexibir o comprovante |

Exemplo de inscrição salva:

```json
{
  "code": "DC27-S3B2E3",
  "name": "Maria Silva Santos",
  "email": "maria.silva@exemplo.com",
  "institution": "Universidade de Brasília",
  "course": "Ciência da Computação",
  "semester": "5",
  "semesterLabel": "5º semestre",
  "track": "ia",
  "trackLabel": "Inteligência Artificial",
  "createdAt": "2026-11-18T23:18:26.801Z"
}
```

**Fluxo de uma inscrição:**
1. O formulário valida os campos. Se houver erro, nada é salvo.
2. O e-mail é normalizado (sem espaços e em minúsculas) e comparado com os já salvos. Se já existir,
   a inscrição é bloqueada e o código existente é informado.
3. Um código `DC27-XXXXXX` é gerado com `crypto.getRandomValues()`:
   - usa um alfabeto sem caracteres ambíguos (sem `0/O` e `1/I`);
   - é conferido para não repetir um código já salvo.
4. A inscrição é adicionada à lista e salva. O comprovante é exibido.
5. Ao recarregar ou reabrir a página, o comprovante da última inscrição aparece novamente.
   O botão "Fazer outra inscrição" volta ao formulário sem apagar os dados salvos.

**Tratamento de erros:**
- Toda leitura e gravação está protegida com `try/catch`.
- Se o LocalStorage estiver bloqueado (modo privado restrito, por exemplo), cheio ou com dados corrompidos,
  o usuário recebe uma mensagem em vez de o site quebrar.
- Os dados digitados são sempre inseridos na página como texto (`textContent`), nunca como HTML,
  o que evita injeção de código.

**Para visualizar ou apagar os dados:** abra as Ferramentas do Desenvolvedor do navegador (F12) e vá em
**Application → Local Storage** (Chrome/Edge) ou **Armazenamento → Armazenamento local** (Firefox).

## Publicação no GitHub Pages

1. Envie os arquivos para um repositório **público** no GitHub. O `index.html` deve ficar na raiz.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, escolha **Source: Deploy from a branch**.
4. Selecione a branch **`main`** e a pasta **`/ (root)`**. Clique em **Save**.
5. Aguarde alguns minutos. O site ficará disponível em `https://<usuario>.github.io/devconecta-2027/`.
6. Copie o link e cole no início deste README, no campo **Site publicado**.

**Por que o projeto já é compatível com o GitHub Pages:**
- Só tem arquivos estáticos, sem backend e sem etapa de build.
- Todos os caminhos são **relativos** (`css/...`, `js/...`, `assets/...`), então funcionam no
  subcaminho `/devconecta-2027/`.
- Os nomes de arquivos estão em minúsculas, porque o servidor diferencia maiúsculas de minúsculas.
- O arquivo `.nojekyll` desativa o processamento Jekyll.
- O GitHub Pages serve o site por HTTPS, o que permite usar ES Modules.

## Como alterar o conteúdo

| O que alterar | Onde |
|---|---|
| Data e horário da contagem regressiva | Constante `EVENT_START` em `js/modules/countdown.js` |
| Atividades e categorias da programação | `js/data/schedule.js` |
| Palestrantes | `js/data/speakers.js` |
| Perguntas do FAQ | `js/data/faq.js` |
| Cores, fontes e espaçamentos | `css/variables.css` |

Os textos fixos (Hero, Sobre, Inscrição, Footer) ficam em `index.html`.

## Limitações conhecidas

- **Não existe inscrição real:**
  - não há envio de e-mail, backend nem banco de dados;
  - os dados não são compartilhados entre navegadores ou dispositivos;
  - os dados se perdem se o usuário limpar os dados do site.
- Os indicadores do Hero (2 dias, 4 trilhas, 12+ atividades) são valores fixos no HTML.
- As fontes vêm do Google Fonts. Sem internet, o site usa as fontes do sistema como alternativa.

## Créditos

- **Disciplina:** Desenvolvimento de Interfaces
- **Instituição:** _preencher_
- **Autor(es):** _preencher_
- **Professor(a):** _preencher_

Projeto desenvolvido com a abordagem de **Vibe Coding**: cada funcionalidade foi construída em uma etapa
separada, com o apoio de IA, e revisada e testada a cada etapa.

---

<sub>DevConecta 2027 é um evento fictício. Nomes de pessoas, empresas e atividades foram criados para
fins acadêmicos, e qualquer semelhança com pessoas ou organizações reais é coincidência.</sub>
