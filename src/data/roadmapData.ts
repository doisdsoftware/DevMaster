export type Level = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  note?: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  estimatedMinutes: number;
  objectives: string[];
  exercises: Exercise[];
  glossary: GlossaryEntry[];
  resources: ResourceLink[];
  /** Dica curta para estudar mais rápido */
  studyTip?: string;
}

export interface Module {
  id: string;
  title: string;
  level: Level;
  lessons: Lesson[];
}

export const ROADMAP_DATA: Module[] = [
  {
    id: 'm1',
    title: 'Fundamentos e Lógica',
    level: 'Iniciante',
    lessons: [
      {
        id: 'intro-1',
        title: 'O que é Programação?',
        description: 'Visão geral: algoritmos, linguagens e o papel do desenvolvedor.',
        category: 'Conceitos',
        estimatedMinutes: 25,
        objectives: [
          'Explicar o que é um programa e por que computadores são literais',
          'Diferenciar código-fonte, linguagem e máquina',
          'Reconhecer o ciclo escrever → testar → corrigir',
        ],
        studyTip: 'Leia em voz alta o que o código “deveria” fazer antes de olhar o resultado no computador.',
        glossary: [
          { term: 'Algoritmo', definition: 'Sequência finita de passos que resolve um problema.' },
          { term: 'Sintaxe', definition: 'Regras de escrita que a linguagem exige para o código ser válido.' },
          { term: 'Bug', definition: 'Comportamento incorreto causado por erro humano no código ou nos requisitos.' },
        ],
        resources: [
          { title: 'MDN — O que é JavaScript?', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/What_is_JavaScript' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'O que melhor descreve programação?',
            options: [
              'Apenas decorar comandos de uma linguagem',
              'Dar instruções precisas para um computador executar uma tarefa',
              'Consertar hardware com chaves de fenda',
              'Criar imagens no Photoshop',
            ],
            correctIndex: 1,
            explanation: 'Programar é transformar ideias em instruções executáveis. Decorar ajuda, mas o núcleo é o raciocínio.',
          },
          {
            id: 'e2',
            question: 'Por que testar o código é essencial?',
            options: [
              'Porque o computador sempre entende a intenção humana',
              'Porque erros aparecem cedo e baratos de corrigir',
              'Porque testes substituem documentação',
              'Porque o código sem testes não roda',
            ],
            correctIndex: 1,
            explanation: 'Testar cedo revela falhas de lógica e requisitos antes que o problema cresça.',
          },
        ],
        content: `# O que é Programação?

Programar é **traduzir um problema** em passos tão claros que uma máquina consegue executá-los sem interpretação criativa.

> **Analogia:** uma receita de bolo. Se você escrever “asse até ficar bom”, o resultado depende de quem lê. Se escrever “180 °C por 35 minutos”, qualquer cozinheiro segue igual.

## O que o computador realmente faz

1. **Lê instruções** (seu código, depois de compilado ou interpretado).
2. **Executa na ordem** (salvo quando você muda o fluxo com condicionais e laços).
3. **Não adivinha intenção** — se faltar um caso, ele não “acha” o certo.

## Algoritmo vs código

- **Algoritmo:** ideia dos passos (pode estar no papel).
- **Código:** algoritmo escrito em uma **linguagem** com **sintaxe** válida.

## Ciclo de aprendizado rápido

1. **Entenda o problema** (entrada → saída esperada).
2. **Escreva o menor exemplo** que funcione.
3. **Generalize** e trate casos extremos.
4. **Leia o erro** (mensagens de erro são pistas, não punição).

### Próximo passo

Na próxima aula você treina **decomposição** e **pseudocódigo** — habilidades que aceleram qualquer linguagem.`,
      },
      {
        id: 'thinking-2',
        title: 'Pensamento computacional',
        description: 'Decomposição, padrões, abstração e algoritmos do dia a dia.',
        category: 'Lógica',
        estimatedMinutes: 30,
        objectives: [
          'Quebrar problemas grandes em partes menores',
          'Reconhecer padrões que permitem reutilizar soluções',
          'Escrever pseudocódigo legível antes do código real',
        ],
        studyTip: 'Para cada problema, escreva em 3 linhas: entrada, saída, e um exemplo numérico concreto.',
        glossary: [
          { term: 'Decomposição', definition: 'Dividir um problema em subproblemas mais simples.' },
          { term: 'Abstração', definition: 'Ignorar detalhes irrelevantes e focar no que importa para a solução.' },
        ],
        resources: [
          { title: 'CS Unplugged (atividades sem computador)', url: 'https://csunplugged.org/en/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual etapa vem primeiro na maioria dos problemas reais?',
            options: [
              'Escolher framework',
              'Entender entradas, saídas e restrições',
              'Escolher cor do botão',
              'Comprar um segundo monitor',
            ],
            correctIndex: 1,
            explanation: 'Sem clareza de entrada/saída, qualquer código vira tentativa e erro cara.',
          },
        ],
        content: `# Pensamento computacional

Antes de TypeScript, React ou banco de dados, existe um hábito: **estruturar o raciocínio**.

## As quatro ideias centrais

| Ideia | Pergunta que você faz |
|-------|------------------------|
| Decomposição | “Posso dividir isso em partes menores?” |
| Reconhecimento de padrões | “Já vi problema parecido?” |
| Abstração | “O que posso ignorar agora?” |
| Algoritmo | “Qual sequência de passos resolve?” |

## Pseudocódigo (exemplo)

Problema: somar os números de 1 a N.

\`\`\`text
ler N
total = 0
para i de 1 até N:
  total = total + i
mostrar total
\`\`\`

> **Dica:** pseudocódigo em português é válido. O objetivo é clareza, não sintaxe perfeita.

## Como treinar rápido

- Resolva problemas no papel **antes** do editor.
- Use exemplos **pequenos** (N=3) e depois generalize.
- Explique a solução em voz alta — se travar, o ponto fraco aparece.`,
      },
      {
        id: 'terminal-3',
        title: 'Terminal, pastas e Git (básico)',
        description: 'Linha de comando, navegação e primeiro controle de versão.',
        category: 'Ferramentas',
        estimatedMinutes: 40,
        objectives: [
          'Navegar pastas e criar arquivos pelo terminal',
          'Inicializar repositório Git e fazer commits significativos',
          'Entender por que versionar código evita perda de trabalho',
        ],
        studyTip: 'Crie um repositório “sandbox” só para testar comandos Git sem medo.',
        glossary: [
          { term: 'Commit', definition: 'Snapshot nomeado do estado do projeto em um instante.' },
          { term: 'Repositório', definition: 'Pasta cujo histórico Git está sendo rastreado.' },
        ],
        resources: [
          { title: 'Git Book (oficial)', url: 'https://git-scm.com/book/pt-br/v2' },
          { title: 'Oh My Git! (jogo)', url: 'https://ohmygit.org/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual comando cria um repositório Git na pasta atual?',
            options: ['git start', 'git init', 'git new', 'git repo'],
            correctIndex: 1,
            explanation: '`git init` cria a pasta `.git` e começa o rastreamento naquele diretório.',
          },
        ],
        content: `# Terminal, pastas e Git (básico)

Profissionais passam muito tempo no **terminal** porque ele é rápido, repetível e automatizável.

## Navegação (conceitos)

- **Diretório atual:** onde o terminal está “parado”.
- **Caminho relativo:** \`./src\` é relativo ao lugar atual.
- **Caminho absoluto:** começa na raiz do sistema (ex.: \`C:\\\` no Windows).

### Comandos úteis (Windows PowerShell / macOS/Linux)

| Ação | PowerShell | macOS/Linux |
|------|------------|-------------|
| Listar | \`dir\` ou \`ls\` | \`ls\` |
| Entrar na pasta | \`cd nome\` | \`cd nome\` |
| Voltar uma pasta | \`cd ..\` | \`cd ..\` |

## Git em 4 passos mentais

1. **Working directory:** arquivos que você edita.
2. **Staging (\`git add\`):** escolhe o que entra no próximo commit.
3. **Commit (\`git commit\`):** salva um snapshot com mensagem.
4. **Remote (\`git push\`):** opcional — envia para servidor (GitHub etc.).

\`\`\`bash
git init
git add .
git commit -m "feat: primeiro commit do projeto"
\`\`\`

> **Boa prática:** mensagens de commit descrevem **o quê** e **por quê** em uma linha curta.`,
      },
      {
        id: 'vars-4',
        title: 'Variáveis e tipos de dados',
        description: 'let, const, primitivos e quando cada um faz sentido.',
        category: 'JavaScript',
        estimatedMinutes: 35,
        objectives: [
          'Usar const por padrão e let quando o valor muda',
          'Diferenciar string, number, boolean e undefined',
          'Evitar “número mágico” nomeando constantes',
        ],
        studyTip: 'Sempre que ver um número ou string no meio da lógica, pergunte: “isso merece um nome?”.',
        glossary: [
          { term: 'Primitivo', definition: 'Valor simples copiado por valor (ex.: number, string, boolean).' },
          { term: 'Imutabilidade', definition: 'Não alterar o dado original; criar um novo valor derivado.' },
        ],
        resources: [
          { title: 'MDN — Tipos de dados', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Em JavaScript moderno, qual declaração você deve preferir quando o valor não muda?',
            options: ['var', 'let', 'const', 'define'],
            correctIndex: 2,
            explanation: '`const` impede reatribuição e comunica intenção. Use `let` só quando precisar mudar a referência.',
          },
          {
            id: 'e2',
            question: 'Qual tipo representa verdadeiro/falso?',
            options: ['string', 'bit', 'boolean', 'flag'],
            correctIndex: 2,
            explanation: 'Boolean tem apenas dois valores: true e false.',
          },
        ],
        content: `# Variáveis e tipos

Variáveis são **nomes** para valores na memória. Em JS/TS modernos:

- **const:** valor não será reatribuído (use por padrão).
- **let:** quando precisa reatribuir (contadores, acumuladores).
- Evite **var** em código novo (escopo confuso).

\`\`\`typescript
const nome = "Ana";
let idade = 20;
idade = 21;
\`\`\`

## Tipos comuns

| Tipo | Exemplo | Uso |
|------|---------|-----|
| string | \`"texto"\` | Texto |
| number | \`42\`, \`3.14\` | Inteiros e decimais no mesmo tipo |
| boolean | \`true\` / \`false\` | Condições |
| null / undefined | ausência de valor | Cuidado: são ideias diferentes |

## TypeScript ajuda cedo

\`\`\`typescript
const quantidade: number = 10;
const titulo: string = "DevMaster";
\`\`\`

> **Erro comum:** misturar número e string em operações (\`"10" + 1\` vira concatenação, não 11).`,
      },
      {
        id: 'ops-5',
        title: 'Operadores e expressões',
        description: 'Aritmética, comparação, lógica e precedência.',
        category: 'JavaScript',
        estimatedMinutes: 25,
        objectives: [
          'Usar === em vez de == na maioria dos casos',
          'Combinar condições com && e || com curto-circuito',
          'Ler expressões complexas quebrando em subpartes',
        ],
        studyTip: 'Quando uma condição ficar longa, extraia para uma variável booleana com nome que leia como frase.',
        glossary: [
          { term: 'Curto-circuito', definition: '&& e || podem não avaliar o segundo operando se o resultado já estiver definido.' },
        ],
        resources: [
          { title: 'MDN — Operadores', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual operador compara valor e tipo em JavaScript?',
            options: ['==', '===', '=equals', '≈'],
            correctIndex: 1,
            explanation: '`===` exige mesmo tipo e valor. `==` faz coerção implícita e costuma gerar surpresas.',
          },
        ],
        content: `# Operadores e expressões

## Comparação

- **===** e **!==** : comparação estrita (recomendada).
- **==** : evite em código novo.

\`\`\`typescript
0 === false  // false
0 == false   // true (coerção)
\`\`\`

## Lógica

- **&&** : ambos precisam ser verdadeiros.
- **||** : basta um ser verdadeiro.
- **!** : negação.

\`\`\`typescript
const podeEntrar = idade >= 18 && documentoValido;
const desconto = ehMembro || ehPrimeiraCompra;
\`\`\`

## Aritmética básica

\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (resto). O operador \`+\` também concatena strings.

> **Dica:** parenteses deixam a intenção óbvia e evitam ambiguidade de precedência.`,
      },
      {
        id: 'control-6',
        title: 'Estruturas de controle',
        description: 'if/else, switch, for, while e quando usar cada um.',
        category: 'Lógica',
        estimatedMinutes: 40,
        objectives: [
          'Modelar decisões com if/else sem aninhar demais',
          'Escolher entre for, while e for...of',
          'Evitar loops infinitos verificando condição de parada',
        ],
        studyTip: 'Desenhe no papel o fluxo (setas) para loops com mais de uma condição de saída.',
        glossary: [
          { term: 'Iteração', definition: 'Uma passada do corpo de um laço.' },
          { term: 'Condicional', definition: 'Trecho que executa só se uma expressão booleana for verdadeira.' },
        ],
        resources: [],
        exercises: [
          {
            id: 'e1',
            question: 'Qual estrutura é mais natural para repetir enquanto uma condição dinâmica for verdadeira?',
            options: ['for (fixo)', 'while', 'switch', 'try'],
            correctIndex: 1,
            explanation: '`while` avalia a condição antes de cada iteração; útil quando não sabemos quantas voltas serão necessárias.',
          },
          {
            id: 'e2',
            question: 'O que \`break\` faz dentro de um switch?',
            options: [
              'Pula para o próximo case sem executar nada',
              'Interrompe o switch (evita fall-through)',
              'Reinicia o switch',
              'Só funciona em loops',
            ],
            correctIndex: 1,
            explanation: 'Sem `break`, o JS “cai” no próximo case — comportamento herdado do C.',
          },
        ],
        content: `# Estruturas de controle

## Condicionais

\`\`\`typescript
if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}
\`\`\`

> **Legibilidade:** muitos \`else if\` seguidos podem virar **tabela de decisão** ou **switch** quando os casos são discretos.

## Laços

\`\`\`typescript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

const nomes = ["Ana", "Bob"];
for (const n of nomes) {
  console.log(n);
}

let n = 0;
while (n < 3) {
  n++;
}
\`\`\`

## Erros comuns

- Esquecer de atualizar a variável do **while** → loop infinito.
- **Off-by-one:** confundir \`<\` e \`<=\` nos limites do for.`,
      },
      {
        id: 'funcs-7',
        title: 'Funções e escopo',
        description: 'Parâmetros, retorno, arrow functions e closure (intro).',
        category: 'JavaScript',
        estimatedMinutes: 45,
        objectives: [
          'Declarar funções puras quando possível (mesma entrada → mesma saída)',
          'Entender parâmetros default e retorno antecipado',
          'Reconhecer quando extrair função melhora leitura e testes',
        ],
        studyTip: 'Regra prática: função com mais de ~25 linhas ou 3 níveis de if — considere extrair.',
        glossary: [
          { term: 'Closure', definition: 'Função que “lembra” variáveis do escopo onde foi criada.' },
          { term: 'Side effect', definition: 'Efeito fora do retorno da função (I/O, mutar global, etc.).' },
        ],
        resources: [
          { title: 'MDN — Funções', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'O que caracteriza uma função “pura” (idealmente)?',
            options: [
              'Sempre usa console.log',
              'Mesma entrada → mesma saída, sem efeitos colaterais observáveis',
              'Só pode ter um parâmetro',
              'Precisa ser arrow function',
            ],
            correctIndex: 1,
            explanation: 'Funções puras são mais fáceis de testar e raciocinar.',
          },
        ],
        content: `# Funções e escopo

Funções agrupam lógica reutilizável e nomeiam a intenção.

\`\`\`typescript
function soma(a: number, b: number): number {
  return a + b;
}

const dobro = (x: number) => x * 2;
\`\`\`

## Parâmetros default

\`\`\`typescript
function saudar(nome: string = "visitante") {
  return \`Olá, \${nome}\`;
}
\`\`\`

## Escopo (resumo)

- **const/let** respeitam bloco \`{ }\`.
- Evite depender de variáveis globais — prefira passar argumentos.

## Quando extrair função?

- Repetição de lógica.
- Nomear um passo complexo.
- Facilitar testes unitários.`,
      },
      {
        id: 'data-8',
        title: 'Arrays, objetos e JSON',
        description: 'Listas, registros, imutabilidade básica e troca de dados.',
        category: 'Dados',
        estimatedMinutes: 45,
        objectives: [
          'Usar map/filter/reduce com clareza de intenção',
          'Modelar entidades como objetos com chaves estáveis',
          'Serializar e desserializar JSON para APIs',
        ],
        studyTip: 'Antes de encadear 4 métodos de array, atribua a um nome intermediário — legibilidade > golf.',
        glossary: [
          { term: 'JSON', definition: 'Formato textual de dados: objetos como { "chave": valor } e arrays [ ].' },
          { term: 'Mutação', definition: 'Alterar o mesmo array/objeto no lugar, em vez de criar cópia.',
          },
        ],
        resources: [
          { title: 'MDN — JSON', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual método cria um **novo** array transformando cada elemento?',
            options: ['filter', 'map', 'reduce', 'sort'],
            correctIndex: 1,
            explanation: '`map` retorna novo array do mesmo tamanho; `filter` filtra; `reduce` agrega.',
          },
        ],
        content: `# Arrays, objetos e JSON

## Arrays

\`\`\`typescript
const nums = [1, 2, 3];
const dobros = nums.map((n) => n * 2);
const pares = nums.filter((n) => n % 2 === 0);
const total = nums.reduce((acc, n) => acc + n, 0);
\`\`\`

## Objetos como registros

\`\`\`typescript
type Usuario = { id: string; nome: string; ativo: boolean };
const u: Usuario = { id: "1", nome: "Ana", ativo: true };
\`\`\`

## JSON

\`\`\`typescript
const texto = JSON.stringify(u);
const deVolta = JSON.parse(texto) as Usuario;
\`\`\`

> **Cuidado:** JSON não suporta funções, \`undefined\` vira omissão ou null dependendo do contexto.`,
      },
      {
        id: 'debug-9',
        title: 'Erros, debug e mensagens',
        description: 'Ler stack trace, usar debugger e estratégias sistemáticas.',
        category: 'Prática',
        estimatedMinutes: 30,
        objectives: [
          'Diferenciar erro de sintaxe, runtime e lógica',
          'Usar breakpoints e console estratégico',
          'Formular hipóteses e validá-las com o menor teste possível',
        ],
        studyTip: 'Copie a mensagem de erro exata e pesquise entre aspas — em minutos você aprende padrões.',
        glossary: [
          { term: 'Stack trace', definition: 'Lista de chamadas que levou ao erro, do mais interno ao externo.' },
        ],
        resources: [
          { title: 'Chrome DevTools — Debugger', url: 'https://developer.chrome.com/docs/devtools/javascript' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Um erro de “lógica” significa que…',
            options: [
              'O código nem compila',
              'O programa roda mas o resultado está errado',
              'Falta internet',
              'O computador está quente',
            ],
            correctIndex: 1,
            explanation: 'Lógica errada é insidiosa: tudo “funciona”, só não faz o que você precisa.',
          },
        ],
        content: `# Erros, debug e mensagens

## Três famílias de problema

1. **Sintaxe:** código inválido — o parser barra antes de rodar.
2. **Runtime:** exceção durante execução (acesso a null, divisão inválida…).
3. **Lógica:** roda sem crash, mas o resultado não bate com a especificação.

## Estratégia rápida

1. **Reproduza** com o menor exemplo possível.
2. **Isole** a linha suspeita (comente blocos).
3. **Instrumente** com \`console.log\` pontual ou **breakpoint**.
4. **Corrija** e adicione um teste ou checklist manual.

\`\`\`typescript
try {
  risky();
} catch (e) {
  console.error("Falhou em risky", e);
}
\`\`\`

> **Hábito de ouro:** quando encontrar a causa, deixe um comentário curto ou teste que impeça regressão.`,
      },
    ],
  },
  {
    id: 'm2',
    title: 'Desenvolvimento Web Moderno',
    level: 'Intermediário',
    lessons: [
      {
        id: 'web-10',
        title: 'HTML e CSS essenciais',
        description: 'Semântica, layout flexível e acessibilidade mínima.',
        category: 'Frontend',
        estimatedMinutes: 50,
        objectives: [
          'Escolher tags semânticas (header, main, nav, article)',
          'Montar layouts com Flexbox antes de grid complexo',
          'Garantir contraste e texto alternativo em imagens',
        ],
        studyTip: 'Inspecione 3 sites que você gosta e anote: hierarquia de headings e espaçamento.',
        glossary: [
          { term: 'Semântica', definition: 'HTML que descreve significado, não só aparência.' },
          { term: 'A11y', definition: 'Acessibilidade — incluir pessoas com deficiência no uso da interface.' },
        ],
        resources: [
          { title: 'MDN — HTML', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/HTML' },
          { title: 'MDN — CSS', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Por que \`<div>\` para tudo não é ideal?',
            options: [
              'Porque div é lento',
              'Porque prejudica leitores de tela e SEO ao não comunicar papel do conteúdo',
              'Porque não aceita CSS',
              'Porque só existe em React',
            ],
            correctIndex: 1,
            explanation: 'Tags semânticas descrevem estrutura: navegação, conteúdo principal, rodapé…',
          },
        ],
        content: `# HTML e CSS essenciais

## HTML semântico

\`\`\`html
<header>
  <nav aria-label="Principal">...</nav>
</header>
<main>
  <article>
    <h1>Título do artigo</h1>
    <p>Parágrafo.</p>
  </article>
</main>
\`\`\`

## CSS: pense em caixas

- **margin** (fora), **border**, **padding** (dentro), **conteúdo**.
- **Flexbox** resolve alinhamento em uma dimensão muito bem.

\`\`\`css
.container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
\`\`\`

> **Acessibilidade mínima:** contraste legível, \`alt\` em imagens informativas, foco visível no teclado.`,
      },
      {
        id: 'dom-11',
        title: 'JavaScript no navegador (DOM e eventos)',
        description: 'Selecionar elementos, ouvir cliques e atualizar a página.',
        category: 'Frontend',
        estimatedMinutes: 45,
        objectives: [
          'Usar querySelector e entender diferença para getElementById',
          'Registrar event listeners sem vazar memória (cleanup)',
          'Separar HTML, comportamento e estilo mentalmente',
        ],
        studyTip: 'Comece com um botão e um contador no HTML puro antes de pular para React.',
        glossary: [
          { term: 'DOM', definition: 'Representação em árvore do HTML que o JS manipula.' },
          { term: 'Event bubbling', definition: 'Evento sobe da origem até ancestrais, a menos que pare a propagação.' },
        ],
        resources: [
          { title: 'MDN — Manipulando documentos', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'O que \`document.querySelector(".btn")\` retorna?',
            options: [
              'Todos os elementos com classe btn',
              'O primeiro elemento que casa com o seletor',
              'Um array de botões',
              'Sempre null',
            ],
            correctIndex: 1,
            explanation: 'querySelector retorna o primeiro match; querySelectorAll retorna NodeList.',
          },
        ],
        content: `# JavaScript no navegador

## Selecionar e mudar

\`\`\`javascript
const el = document.querySelector("#app");
el.textContent = "Olá!";
\`\`\`

## Eventos

\`\`\`javascript
btn.addEventListener("click", () => {
  console.log("clicou");
});
\`\`\`

> **React abstrai isso**, mas entender DOM ajuda a debugar e a ler erros de hidratação/SSR depois.`,
      },
      {
        id: 'async-12',
        title: 'Assíncrono: Promises e async/await',
        description: 'Operações que levam tempo: rede, timers e tratamento de erro.',
        category: 'JavaScript',
        estimatedMinutes: 50,
        objectives: [
          'Encadear async com await e try/catch',
          'Entender que await pausa só a função async, não o thread inteiro (no browser)',
          'Evitar “callback hell” preferindo async/await legível',
        ],
        studyTip: 'Sempre que usar await em loop, pergunte: preciso sequencial ou posso Promise.all?',
        glossary: [
          { term: 'Promise', definition: 'Representa valor futuro: pendente, resolvida ou rejeitada.' },
        ],
        resources: [
          { title: 'MDN — async/await', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'O que \`await\` faz dentro de uma função \`async\`?',
            options: [
              'Trava o navegador inteiro',
              'Pausa essa função até a Promise resolver/rejeitar',
              'Cria uma thread nova',
              'Substitui o fetch',
            ],
            correctIndex: 1,
            explanation: 'Outras tarefas do browser continuam; só a função async “espera”.',
          },
        ],
        content: `# Assíncrono

## Fetch com async/await

\`\`\`typescript
async function carregarUsuario(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Falha na rede");
  return res.json();
}
\`\`\`

## Paralelo vs sequencial

\`\`\`typescript
const [a, b] = await Promise.all([fetchA(), fetchB()]);
\`\`\`

> **Erro comum:** esquecer \`await\` e trabalhar com a Promise em vez do resultado.`,
      },
      {
        id: 'ts-13',
        title: 'TypeScript na prática',
        description: 'Tipos, interfaces, unions e integração com React.',
        category: 'TypeScript',
        estimatedMinutes: 55,
        objectives: [
          'Tipar props de componentes e retornos de função',
          'Usar union types e narrowing',
          'Ler erros do compilador como feedback de design',
        ],
        studyTip: 'Quando o TS “brigar”, não use `any` de primeira — tente `unknown` ou um tipo mais estreito.',
        glossary: [
          { term: 'Narrowing', definition: 'Refinar tipo dentro de um if (ex.: checar null).' },
          { term: 'Generics', definition: 'Tipos parametrizados, como Array<T>.' },
        ],
        resources: [
          { title: 'Handbook TypeScript', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual é o principal benefício imediato do TypeScript em time?',
            options: [
              'Código roda mais rápido',
              'Erros de formato de dados aparecem antes da produção',
              'Substitui testes',
              'Remove necessidade de Git',
            ],
            correctIndex: 1,
            explanation: 'Tipos documentam contratos e o compilador avisa inconsistências cedo.',
          },
        ],
        content: `# TypeScript na prática

## Interface vs type

\`\`\`typescript
interface Props {
  titulo: string;
  onClose?: () => void;
}

type Id = string | number;
\`\`\`

## Unions e narrowing

\`\`\`typescript
function fmtId(id: string | number) {
  if (typeof id === "number") return id.toFixed(0);
  return id.toUpperCase();
}
\`\`\`

## Com React

\`\`\`tsx
function Card({ titulo }: Props) {
  return <article>{titulo}</article>;
}
\`\`\`

> **Filosofia:** TypeScript é **ferramenta de design** — se os tipos ficam impossíveis, o modelo de dados provavelmente precisa ser mais simples.`,
      },
      {
        id: 'react-14',
        title: 'React: componentes e JSX',
        description: 'Composição, props e o modelo declarativo de UI.',
        category: 'React',
        estimatedMinutes: 50,
        objectives: [
          'Dividir UI em componentes com responsabilidade única',
          'Passar dados via props de cima para baixo',
          'Entender reconciliação em alto nível (o “diff” do React)',
        ],
        studyTip: 'Nomeie componentes como substantivos (UserCard), não verbos (ShowUser).',
        glossary: [
          { term: 'Props', definition: 'Entradas somente leitura de um componente pai para filho.' },
          { term: 'JSX', definition: 'Sintaxe que parece HTML mas vira chamadas de função do React.' },
        ],
        resources: [
          { title: 'React — Learn', url: 'https://react.dev/learn' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'As props em React são…',
            options: [
              'Mutáveis pelo filho',
              'Somente leitura para o filho',
              'Globais automáticas',
              'Iguais a variáveis de ambiente',
            ],
            correctIndex: 1,
            explanation: 'Imutabilidade de props força fluxo de dados previsível.',
          },
        ],
        content: `# React: componentes e JSX

\`\`\`tsx
type HelloProps = { nome: string };

function Hello({ nome }: HelloProps) {
  return <p>Olá, {nome}</p>;
}

export function App() {
  return (
    <main>
      <Hello nome="Dev" />
    </main>
  );
}
\`\`\`

## Composição

Prefira **muitos componentes pequenos** a um “DeusComponent” de 400 linhas.

> **react.dev** é a documentação oficial atual — priorize ela em 2024+.`,
      },
      {
        id: 'hooks-15',
        title: 'Hooks: estado e efeitos',
        description: 'useState, useEffect, useRef e armadilhas comuns.',
        category: 'React',
        estimatedMinutes: 55,
        objectives: [
          'Modelar estado mínimo (evitar estado derivado duplicado)',
          'Usar useEffect com lista de dependências correta',
          'Limpar efeitos (subscriptions, timers) no cleanup',
        ],
        studyTip: 'Se o efeito “precisa rodar sempre que X muda”, X deve estar no array de dependências.',
        glossary: [
          { term: 'Estado derivado', definition: 'Valor calculável a partir de outros estados — não guarde duplicado.' },
          { term: 'Stale closure', definition: 'Função que captura valor antigo de estado por dependência faltando no efeito.' },
        ],
        resources: [
          { title: 'React — useEffect', url: 'https://react.dev/reference/react/useEffect' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'O que acontece se você omitir o array de dependências do useEffect?',
            options: [
              'O efeito nunca roda',
              'O efeito roda após cada render',
              'O React desliga o componente',
              'Vira Server Component',
            ],
            correctIndex: 1,
            explanation: 'Sem segundo argumento, o efeito dispara após cada pintura — útil só em casos raros.',
          },
        ],
        content: `# Hooks

## Estado

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

## Efeito colateral

\`\`\`tsx
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);
\`\`\`

## useRef

Guarda valor mutável **sem** rerenderizar a cada mudança (ex.: referência de DOM, timer id).

> **Regra mental:** **useState** → UI precisa reagir; **useRef** → valor interno que não deve disparar render.`,
      },
      {
        id: 'router-16',
        title: 'Rotas, dados e formulários (visão geral)',
        description: 'SPA routing, loading states e validação básica.',
        category: 'React',
        estimatedMinutes: 40,
        objectives: [
          'Entender URL como estado compartilhável',
          'Separar busca de dados de apresentação quando possível',
          'Validar input no cliente como UX, no servidor como segurança',
        ],
        studyTip: 'Antes de biblioteca de formulários, domine controlled inputs com um campo.',
        glossary: [
          { term: 'SPA', definition: 'Single Page Application — navegação sem recarregar página inteira.' },
        ],
        resources: [
          { title: 'React Router', url: 'https://reactrouter.com/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Validação só no front-end é suficiente para segurança?',
            options: [
              'Sim, usuários não abrem DevTools',
              'Não — o servidor deve validar sempre',
              'Só se usar HTTPS',
              'Só em TypeScript',
            ],
            correctIndex: 1,
            explanation: 'Cliente é hostil — qualquer validação local pode ser burlada.',
          },
        ],
        content: `# Rotas e dados

## Ideia central

A **URL** é estado que o usuário pode compartilhar. Rotas mapeiam URL → tela.

## Dados

Fluxo comum:

1. Componente monta → dispara fetch.
2. Mostra **loading** / **erro** / **sucesso**.
3. Cache (React Query, SWR, Router loaders…) reduz repetição.

## Formulários

- **Controlled:** valor vem do estado React.
- Validação no cliente melhora UX; **servidor valida de novo**.

> Esta aula é ponte para backend: na próxima trilha você vê onde os dados “moram” de verdade.`,
      },
    ],
  },
  {
    id: 'm3',
    title: 'Arquitetura e Backend',
    level: 'Avançado',
    lessons: [
      {
        id: 'api-17',
        title: 'HTTP, APIs REST e Node.js',
        description: 'Verbos, status codes, JSON e um servidor mínimo.',
        category: 'Backend',
        estimatedMinutes: 55,
        objectives: [
          'Escolher verbo HTTP adequado (GET seguro/idempotente, POST para criação…)',
          'Interpretar status 2xx/4xx/5xx',
          'Esboçar API RESTful com recursos e sub-recursos',
        ],
        studyTip: 'Memorize: 200 OK, 201 Created, 400 Bad Request, 401/403, 404, 409, 500.',
        glossary: [
          { term: 'Idempotente', definition: 'Mesma requisição repetida tem efeito como uma (ex.: GET).' },
          { term: 'REST', definition: 'Estilo de API centrado em recursos e verbos HTTP.' },
        ],
        resources: [
          { title: 'MDN — HTTP', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Qual verbo é mais adequado para **buscar** dados sem efeitos colaterais?',
            options: ['POST', 'GET', 'DELETE', 'PATCH'],
            correctIndex: 1,
            explanation: 'GET não deve alterar estado no servidor (em design correto).',
          },
        ],
        content: `# HTTP e APIs

## REST em uma frase

**Recursos** (\`/users\`, \`/users/42\`) manipulados com **verbos** HTTP.

## Status codes (mapa mental)

- **2xx:** deu certo.
- **4xx:** cliente errou (dados, auth, permissão).
- **5xx:** servidor falhou.

## Node (visão)

\`\`\`javascript
// Pseudocódigo Express
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
\`\`\`

> **Microsserviços** entram quando limites de time/escala exigem deploy independente — não é “obrigatório” no início.`,
      },
      {
        id: 'db-18',
        title: 'Bancos de dados e modelagem',
        description: 'SQL vs NoSQL, chaves, índices e migrações.',
        category: 'Backend',
        estimatedMinutes: 50,
        objectives: [
          'Explicar tabela, chave primária e relação 1:N em alto nível',
          'Reconhecer quando NoSQL simplifica e quando SQL é mais seguro conceitualmente',
          'Entender migrações como histórico de evolução do schema',
        ],
        studyTip: 'Desenhe entidades em papel (caixas e setas) antes de criar tabelas.',
        glossary: [
          { term: 'Schema', definition: 'Estrutura declarada: tabelas, colunas, tipos, restrições.' },
          { term: 'Índice', definition: 'Estrutura que acelera buscas em colunas específicas.' },
        ],
        resources: [
          { title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Em SQL relacional, o que é uma chave primária?',
            options: [
              'Senha do admin',
              'Identificador único de uma linha em uma tabela',
              'Índice opcional',
              'Nome da coluna mais longa',
            ],
            correctIndex: 1,
            explanation: 'PK garante unicidade e ancora relações.',
          },
        ],
        content: `# Bancos de dados

## SQL (relacional)

- Dados em **tabelas** com tipos fortes.
- **JOINs** conectam entidades relacionadas.

## NoSQL

- Documentos (MongoDB), chave-valor, colunar, grafo…
- Flexível, mas **modelagem** e consistência exigem disciplina.

## Boas práticas

- **Migrações** versionam mudanças de schema.
- **Índices** aceleram consultas frequentes (com trade-off de escrita).

> **Transação:** conjunto de operações que commitam ou falham juntas — crucial para consistência financeira.`,
      },
      {
        id: 'sec-19',
        title: 'Segurança e autenticação (bases)',
        description: 'HTTPS, hashing de senha, JWT vs sessões, OWASP top risks.',
        category: 'Backend',
        estimatedMinutes: 45,
        objectives: [
          'Nunca armazenar senha em texto puro',
          'Diferenciar autenticação (quem é) de autorização (o que pode)',
          'Reconhecer XSS e SQL injection em alto nível',
        ],
        studyTip: 'Quando ouvir “criptografar senha”, corrija mentalmente: senha deve ser **hasheada** (bcrypt/argon2).',
        glossary: [
          { term: 'JWT', definition: 'Token assinado frequentemente usado em APIs stateless.' },
          { term: 'XSS', definition: 'Injeção de script no contexto de outro usuário via página web.' },
        ],
        resources: [
          { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Armazenar senhas em texto puro no banco é aceitável em ambiente de desenvolvimento?',
            options: [
              'Sim, é mais rápido',
              'Não — hábito vira vazamento; use hashes sempre',
              'Só se usar MongoDB',
              'Só se tiver HTTPS',
            ],
            correctIndex: 1,
            explanation: 'Treine o fluxo correto desde o dia 1.',
          },
        ],
        content: `# Segurança (bases)

## Senhas

Use bibliotecas de **hash** com salt (bcrypt, argon2). **Nunca** “criptografe” senha de forma reversível para armazenar.

## Auth vs AuthZ

- **Autenticação:** provar identidade (login).
- **Autorização:** checar permissão (roles, policies).

## Ataques comuns (visão)

- **SQL injection:** concatenar input do usuário em query — use **queries parametrizadas**.
- **XSS:** sanitizar/escapar saída, CSP, evitar \`dangerouslySetInnerHTML\` sem necessidade.

> **HTTPS** é piso, não teto — protege trânsito, não substitui validação no servidor.`,
      },
      {
        id: 'test-20',
        title: 'Testes automatizados',
        description: 'Pirâmide de testes, unitários e smoke tests.',
        category: 'Qualidade',
        estimatedMinutes: 40,
        objectives: [
          'Diferenciar teste unitário, integração e end-to-end',
          'Escrever testes que descrevem comportamento, não implementação frágil',
          'Rodar testes no CI antes do merge',
        ],
        studyTip: 'Comece testando funções puras e reducers — ROI imediato.',
        glossary: [
          { term: 'CI', definition: 'Integração contínua — pipeline que valida cada mudança automaticamente.' },
        ],
        resources: [
          { title: 'Vitest', url: 'https://vitest.dev/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Testes E2E costumam ser…',
            options: [
              'Os mais rápidos e baratos',
              'Mais lentos e frágeis, mas cobrem jornadas críticas do usuário',
              'Substitutos de tipos estáticos',
              'Desnecessários se houver TypeScript',
            ],
            correctIndex: 1,
            explanation: 'Pirâmide: muitos unitários, alguns integrados, poucos E2E bem escolhidos.',
          },
        ],
        content: `# Testes automatizados

## Pirâmide

- **Unitário:** função isolada, rápido.
- **Integração:** módulos juntos (DB, HTTP local).
- **E2E:** navegador simulado — caro, mas pega problemas reais de fluxo.

## O que testar primeiro?

1. Regras de negócio puras.
2. Conversores/validadores.
3. Caminhos críticos (login, checkout…).

> **Fragilidade:** teste acoplado a detalhe interno quebra quando você refatora sem mudar comportamento.`,
      },
      {
        id: 'arch-21',
        title: 'Arquitetura limpa, deploy e próximos passos',
        description: 'Separação de camadas, observabilidade e carreira contínua.',
        category: 'Carreira',
        estimatedMinutes: 45,
        objectives: [
          'Separar UI de regras de negócio e adaptadores de infraestrutura',
          'Entender build, ambiente e variáveis de configuração',
          'Montar plano de estudo contínuo (projetos + leitura + comunidade)',
        ],
        studyTip: 'Um projeto “full” pequeno vale mais que 20 tutoriais sem entrega.',
        glossary: [
          { term: 'Observabilidade', definition: 'Logs, métricas e traces para entender sistemas em produção.' },
        ],
        resources: [
          { title: '12 Factor App', url: 'https://12factor.net/pt_br/' },
        ],
        exercises: [
          {
            id: 'e1',
            question: 'Por que misturar regra de negócio com chamadas HTTP diretas na UI dificulta evolução?',
            options: [
              'Porque HTTP é lento',
              'Porque acopla interface a detalhes de transporte e dificulta testes/reuso',
              'Porque React proíbe',
              'Porque aumenta uso de memória',
            ],
            correctIndex: 1,
            explanation: 'Camadas claras permitem trocar API, testar regra sem browser, etc.',
          },
        ],
        content: `# Arquitetura e deploy

## Camadas (mental model)

1. **Domínio / regras** — coração estável.
2. **Casos de uso** — orquestração.
3. **Adaptadores** — HTTP, DB, fila.
4. **UI** — React, CLI…

## Deploy

- **Build** gera artefatos estáticos ou bundle servidor.
- **Variáveis de ambiente** configuram segredos e URLs por ambiente.
- **Healthcheck** expõe se o serviço está vivo.

## Próximos passos (rápido e contínuo)

1. Construa **um projeto ponta a ponta** (auth, CRUD, deploy).
2. Leia código open source pequeno.
3. Participe de revisões e escreva **RFCs curtas** para suas próprias decisões.

> **DevMaster** é trilha — a velocidade real vem de **ciclos curtos**: aprender → aplicar → revisar → repetir.`,
      },
    ],
  },
];

export function getAllLessons(): Lesson[] {
  return ROADMAP_DATA.flatMap((m) => m.lessons);
}

export function getTotalLessonCount(): number {
  return getAllLessons().length;
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === id);
}

export function getAdjacentLessons(currentId: string): { prev: Lesson | null; next: Lesson | null } {
  const flat = getAllLessons();
  const i = flat.findIndex((l) => l.id === currentId);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? flat[i - 1]! : null,
    next: i < flat.length - 1 ? flat[i + 1]! : null,
  };
}
