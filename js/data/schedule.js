/**
 * Dados da programação do DevConecta 2027 (conteúdo fictício).
 *
 * Para alterar a programação, edite apenas este arquivo:
 * - categories: categorias usadas nos filtros e nas etiquetas.
 * - scheduleDays: dias do evento e suas atividades.
 *
 * Campos de cada atividade:
 *   start / end   horário no formato "HH:MM"
 *   type          Palestra, Workshop ou Painel
 *   category      id de uma das categorias abaixo
 *   title         título da atividade
 *   description   descrição curta
 *   speaker       responsável (nome fictício)
 *   role          cargo ou função do responsável
 */

export const categories = [
  { id: 'ia', label: 'Inteligência Artificial' },
  { id: 'web', label: 'Desenvolvimento Web' },
  { id: 'inovacao', label: 'Inovação e Tecnologia' },
  { id: 'carreira', label: 'Carreira e Mercado' },
];

export const scheduleDays = [
  {
    id: 'dia-1',
    label: 'Dia 1',
    date: '2027-06-17',
    dateLabel: '17 de junho · quinta-feira',
    activities: [
      {
        start: '09:00',
        end: '10:00',
        type: 'Palestra',
        category: 'inovacao',
        title: 'Keynote de abertura: a próxima década da tecnologia',
        description: 'Um panorama das tendências que vão moldar a forma como criamos, aprendemos e trabalhamos com tecnologia.',
        speaker: 'Helena Duarte',
        role: 'Pesquisadora em Inovação Digital',
      },
      {
        start: '10:30',
        end: '11:30',
        type: 'Palestra',
        category: 'ia',
        title: 'IA generativa na prática: do protótipo ao produto',
        description: 'Como sair de experimentos com modelos de linguagem e chegar a funcionalidades úteis, seguras e mensuráveis.',
        speaker: 'Rafael Moreira',
        role: 'Engenheiro de Machine Learning',
      },
      {
        start: '11:30',
        end: '12:30',
        type: 'Workshop',
        category: 'web',
        title: 'Front-end moderno com HTML, CSS e JavaScript puro',
        description: 'Mão na massa: componentes, layout responsivo e interatividade sem depender de frameworks.',
        speaker: 'Camila Torres',
        role: 'Desenvolvedora Front-end Sênior',
      },
      {
        start: '14:00',
        end: '15:00',
        type: 'Painel',
        category: 'ia',
        title: 'Ética e responsabilidade em sistemas de IA',
        description: 'Vieses, transparência e privacidade: o que todo desenvolvedor precisa considerar ao criar soluções com IA.',
        speaker: 'André Lima',
        role: 'Professor de Ciência da Computação',
      },
      {
        start: '15:30',
        end: '16:30',
        type: 'Painel',
        category: 'carreira',
        title: 'Do estágio à liderança: trilhas de carreira em tecnologia',
        description: 'Profissionais em diferentes momentos da carreira compartilham escolhas, erros e aprendizados.',
        speaker: 'Juliana Prado',
        role: 'Gerente de Engenharia',
      },
      {
        start: '16:30',
        end: '17:30',
        type: 'Palestra',
        category: 'web',
        title: 'Acessibilidade web: construindo para todas as pessoas',
        description: 'Boas práticas de semântica, contraste e navegação por teclado para interfaces verdadeiramente inclusivas.',
        speaker: 'Lucas Fernandes',
        role: 'Especialista em Acessibilidade',
      },
    ],
  },
  {
    id: 'dia-2',
    label: 'Dia 2',
    date: '2027-06-18',
    dateLabel: '18 de junho · sexta-feira',
    activities: [
      {
        start: '09:00',
        end: '10:00',
        type: 'Palestra',
        category: 'inovacao',
        title: 'Startups e inovação: como transformar ideias em negócios',
        description: 'Da validação do problema ao primeiro cliente: o caminho de quem empreende com tecnologia.',
        speaker: 'Marina Albuquerque',
        role: 'Fundadora de Startup',
      },
      {
        start: '10:00',
        end: '12:00',
        type: 'Workshop',
        category: 'ia',
        title: 'Machine learning para iniciantes',
        description: 'Conceitos essenciais e um primeiro modelo construído passo a passo, do conjunto de dados à avaliação.',
        speaker: 'Bruno Carvalho',
        role: 'Cientista de Dados',
      },
      {
        start: '11:30',
        end: '12:30',
        type: 'Palestra',
        category: 'web',
        title: 'APIs e integração: arquitetura de aplicações web',
        description: 'REST, autenticação e boas práticas para conectar front-end e serviços de forma segura e escalável.',
        speaker: 'Thiago Ramos',
        role: 'Arquiteto de Software',
      },
      {
        start: '14:00',
        end: '15:30',
        type: 'Workshop',
        category: 'carreira',
        title: 'Portfólio que abre portas: como se destacar',
        description: 'Como apresentar projetos, escrever um bom README e se preparar para entrevistas técnicas.',
        speaker: 'Patrícia Nunes',
        role: 'Recrutadora Tech',
      },
      {
        start: '15:30',
        end: '16:30',
        type: 'Palestra',
        category: 'inovacao',
        title: 'Cidades inteligentes e Internet das Coisas',
        description: 'Sensores, dados e conectividade a serviço da mobilidade, da energia e da qualidade de vida urbana.',
        speaker: 'Eduardo Sales',
        role: 'Professor de Engenharia de Computação',
      },
      {
        start: '16:30',
        end: '17:30',
        type: 'Painel',
        category: 'carreira',
        title: 'Painel de encerramento: o mercado de tecnologia em 2030',
        description: 'Quais habilidades estarão em alta e como estudantes podem se preparar desde já.',
        speaker: 'Fernanda Rocha',
        role: 'Mediadora · Diretora de Tecnologia',
      },
    ],
  },
];
