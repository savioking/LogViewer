/**
 * Configuração do Bestiário da Campanha "Fullgor dos Deuses" (Tormenta20)
 * 
 * Cada ameaça contém:
 * - id: Identificador único
 * - name: Nome da ameaça
 * - faction: Lista de facções a que pertence (array de strings)
 * - type: Tipo de criatura (Humanoide, Monstro, Construto, Morto-vivo, etc.)
 * - level: Nível / ND da criatura
 * - image: Nome do arquivo dentro de 'assets/bestiario' (ou null/vazio para quadrado vazio)
 * - description: Descrição geral
 * - skills: Lista de passagens com título e texto descritivo
 * - lore: Lista de passagens com título e texto descritivo (estilo História Pessoal)
 */

export const bestiarioData = [
  {
    id: 'soldado-purista',
    name: 'Soldado da Pureza Divina',
    faction: ['Purista'],
    type: 'Humanoide',
    level: 0.5,
    image: 'soldado-pureza.png',
    description: 'Soldados do exército purista. Mais do que infantaria rasa, esses são verdadeiros cultistas da seita extrema da Pureza Divina, que acredita na união sincrética entre Valkaria e Arsenal.',
    skills: [
      {
        title: 'Ódio Puro',
        text: 'Quando seguindo as ordens de um superior, são inabaláveis em sua força de vontade. Além disso, como todo purista, carregam ódio mortal contra não humanos.'
      }
    ],
    lore: [
      {
        title: 'A Marcha sobre Izmorra',
        text: 'Durante o Arco III, uma célula da Pureza Divina invadiu e tomou Izmorra debaixo do nariz do Reinado, cortando a comunicação com o resto do reino.'
      },
    ]
  },
  {
    id: 'carvarel-invocado',
    name: 'Carvarel Invocado',
    faction: ['Abissal'],
    type: 'Espírito',
    level: 1,
    image: 'carvarel.png',
    description: 'Demônios dos mundos infernais que compõem a infantaria de exércitos de vários deuses malignos. São concedidos para devotos fervorosos como recompensa pela fé e por sacrifícios.',
    skills: [],
    lore: [
      {
        title: 'Invocação Fugaz',
        text: 'Os puristas que invadiram Izmorra invocaram alguns carvarel através de sacrifícios dos inocentes, para proteger a cidade de olhos curiosos e aterrorizar a população. Débeis, esses demônios foram despachados com facilidade pelos campeões de Arsenal.'
      },
    ]
  },
  {
    id: 'carvarel-fullgori',
    name: 'Carvarel Fullgori',
    faction: ['Abissal','Fullgor'],
    type: 'Espírito',
    level: 2,
    image: 'carvarel-fullgori.png',
    description: 'Esses demônios tiveram influência da energia divina infecciosa do Fullgor quando foram invocados, que se manifesta em seus corpos como símbolos cicatrizados luminosos. Extirpados de suas almas, em vez de retornarem para seu plano de origem, esses demônios desaparecem em estilhas ao morrerem.',
    skills: [],
    lore: [
      {
        title: 'Invocação Fullgori',
        text: 'Os campeões de Arsenal observaram prisioneiros sendo sacrificados para invocar esses demônios durante o ritual do Ídolo Fullgori. A influência divina do Fullgor deve ter infectado o próprio ritual de invocação.'
      },
    ]
  },
  {
    id: 'acolito-purista',
    name: 'Acólito da Pureza Divina',
    faction: ['Purista'],
    type: 'Humanoide',
    level: 2,
    image: 'acolito-pureza.png', // Sem imagem por padrão (quadrado vazio)
    description: 'Comandantes na guerra e na fé, esses apóstolos são o cerne da teologia sincrética da Pureza Divina. Comandam os cultistas menores e conjuram milagres reais através de magia divina atendida misteriosamente pelos deuses.',
    skills: [
      {
        title: 'Ódio Puro',
        text: 'Quando seguindo as ordens de um superior, são inabaláveis em sua força de vontade. Além disso, como todo purista, carregam ódio mortal contra não humanos.'
      },
      {
        title: 'Magia Divina',
        text: 'Como clérigos da igreja da Pureza Divina, os acólitos conjuram magias. São capazes de conjurar armas espectrais, auras de proteção e orações de combate. Também utilizam de magias para subterfúgio como Silêncio.'
      }
    ],
    lore: [
      {
        title: 'A Marcha sobre Izmorra',
        text: 'Durante o Arco III, uma célula da Pureza Divina invadiu e tomou Izmorra debaixo do nariz do Reinado, cortando a comunicação com o resto do reino.'
      },
    ]
  },
  {
    id: 'kallhast-frade',
    name: 'Frade Kallhast',
    faction: ['Purista'],
    type: 'Humanoide',
    level: 8,
    image: 'kallhast.png', // Sem imagem por padrão (quadrado vazio)
    description: 'Um Frade desgarrado da Supremacia, que liderou uma célula da Pureza Divina sorrateiramente por Deheon até encontrarem seu destino em Izmorra.',
    skills: [
      {
        title: 'Ódio Puro',
        text: 'Quando seguindo as ordens de um superior, é inabalável em sua força de vontade. Além disso, como todo purista, carrega ódio mortal contra não humanos.'
      },
      {
        title: 'Magia Divina',
        text: 'Como frade da igreja da Pureza Divina, Kallhast conjura magias. É capaz de conjurar armas espectrais, auras de proteção e orações de combate. Também utiliza de magias para subterfúgio como Silêncio.'
      },
    ],
    lore: [
      {
        title: 'A Marcha sobre Izmorra',
        text: 'Durante o Arco III, uma célula da Pureza Divina invadiu e tomou Izmorra debaixo do nariz do Reinado, cortando a comunicação com o resto do reino.'
      },
      {
        title: 'Ídolo Fullgori',
        text: 'Kallhast usou os artesãos prisioneiros para fabricar um ídolo de pedra unindo Valkaria e Arsenal em um amálgama profano. Ele invocou o Fullgor para habitar o Ídolo através de sacrifícios. Inicialmente pretendia sacrificar os prisioneiros, mas a interferência dos campeões de arsenal o forçou a sacrificar seus aliados e, por fim, a si mesmo.'
      }
    ]
  },
  {
    id: 'idolo-fullgori',
    name: 'Ídolo Fullgori',
    faction: ['Purista','Fullgor'],
    type: 'Espírito',
    level: 3,
    image: 'idolo-fullgori.png', // Sem imagem por padrão (quadrado vazio)
    description: '????',
    skills: [],
    lore: []
  },
  {
    id: 'lagarto-persegue',
    name: 'Lagarto Perseguidor',
    faction: ['Ermos'],
    type: 'Monstro',
    level: 1,
    image: 'lagarto-persegue.png',
    description: 'Um grande réptil nativo das regiões mais selvagens de Arton. É um predador oportunista, esperando na encolha para morder as presas e, só quando estiverem mortas do sangramento ou do veneno, voltar para buscar o alimento.',
    skills: [],
    lore: [
      {
        title: 'Problema do Yorgo',
        text: 'Yorgo, um fazendeiro local dos arredores de Arvendhal, estava com um problema com seus porcos sendo mortos durante a noite. O culpado era um lagarto perseguidor, que os campeões de arsenal emboscaram e capturaram em troca de informações sobre a Promessa das Cinzas. Grakk tentou amansar a criatura, mas no fim ela fugiu da região.'
      }
    ]
  },
  {
    id: 'slark',
    name: 'Slark',
    faction: ['Ermos'],
    type: 'Monstro',
    level: 1,
    image: 'slark.png',
    description: 'Criaturas subterrâneas predatórias com aspecto reptiliano e saliva ácida. Habitam cavernas e túneis escuros, muitas vezes antigas minas abandonadas. São territoriais e violentos, mas também furtivos e cautelosos, preferindo emboscar os intrusos.',
    skills: [
      {
        title: 'Saliva Ácida',
        text: 'Slarks produzem um muco ácido usado para digestão, escavação e ataque. Em combate, são capazes de cuspir o muco, que cega temporariamente caso atinja os olhos.'
      },
      {
        title: 'Emboscada',
        text: 'Capaz de escalar tetos e paredes íngremes com agilidade assombrosa, eles ficam em espera tão imóveis quanto perdras, e desabam de surpresa sobre a retaguarda dos alvos desavisados.'
      }
    ],
    lore: [
      {
        title: 'O Ninho de Arvendhal',
        text: 'Slarks invadiram as antigas minas de Arvendhal quando foram fechadas após o fim dos veios de arenito dourado. Tempos depois, um grupo de aventureiros que explorava o local foi emboscado e morto, restando apenas uma sobrevivente.'
      }
    ]
  },
  {
    id: 'slark-fullgori',
    name: 'Slark Fullgori',
    faction: ['Fullgor'],
    type: 'Monstro',
    level: 1,
    image: 'slark-fullgori.png',
    description: 'Slarks que foram infectados pelo Fullgor gotejante do portal aberto por Miriane nas minas de Arvendhal. Eles seguem uma crença singular da fome e destruição, ardendo com luz divina imprópria para seus corpos grotescos.',
    skills: [
      {
        title: 'Saliva Luminosa',
        text: 'O muco tradicional produzido pelos slarks agora reproduz a infecção do Fullgor, brilhando com energia divina. Em combate, são capazes de cuspir o muco, que cega temporariamente caso atinja os olhos e arde com luz calcinante.'
      },
    ],
  },
  {
    id: 'miriane-fullgor',
    name: 'Miriane do Fullgor',
    faction: ['Fullgor'],
    type: 'Humanoide',
    level: 1,
    image: 'miriane.png', // Sem imagem por padrão para demonstrar o quadrado vazio
    description: 'Antiga devota e conjuradora que caiu na promessa do Fullgor quando se viu sem esperanças após perder seus companheiros em uma emboscada. Seguia dogmas corrompidos de Thyatis, acreditando que era preciso forçar a ressurreição através do assassinato, para conseguir a verdadeira segunda chance.',
    skills: [
      {
        title: 'Milagre Corrompido',
        text: 'Mesmo seguindo dogmas claramente falsos de Thyatis, Miriane ainda mantinha-se capaz de conjurar magia divina. A fé corrompida ainda servia como fé, mas para o Fullgor.'
      },
    ],
    lore: [
      {
        title: 'Portal Fullgori',
        text: 'Miriane foi capaz de invocar um portal alimentado pela morte de slarks e de seus companheiros de aventura, e pelo poder da Promessa das Cinzas. O portal trouxe a corrupção fullgori para arton e infectou os slarks e o artefato de Arsenal.'
      },
      {
        title: 'O Julgamento e a Piedade',
        text: 'Derrotada após o Avatar da Promessa ser banido, Miriane foi poupada pelo grupo no julgamento presidido por Valkar. Ela foi presa e mantém-se sob observação de Haelga nos arredores da cidade de Arvendhal.'
      }
    ]
  },
  {
    id: 'avatar-promessa',
    name: 'Avatar da Promessa',
    faction: ['Fullgor'],
    type: 'Espírito',
    level: 3,
    image: 'avatar-promessa.png', // Sem imagem por padrão (quadrado vazio)
    description: 'O espírito da alabarda mágica de Arsenal, Promessa das Cinzas, acordado e influenciado pelo Fullgor.',
    skills: [
      {
        title: 'Portador da Promessa',
        text: 'Corrompido pelo Fullgor, o Avatar da Promessa é uma paródia dos tempos de vilão cobiçoso de Arsenal, e é facinado pela arma que ele próprio representa. Enquanto porta a Promessa das Cinzas, seus ataques são carregados de luz calcinante, mas, se perder ela, definha e desaparece aos poucos, e fica obcecado em recuperá-la.'
      },
    ],
    lore: [
      {
        title: 'Avatar Fullgori',
        text: 'Apesar dos esforços dos campeões de Arsenal, a Promessa das Cinzas ainda despertou um avatar dentro de si, corrompida pelo Fullgor infundido por Miriane em seu ritual macabro. Mesmo com dificuldade, os campeões derrotaram o espírito doentio e purificaram a Promessa, recuperando-a em nome do seu dono original.'
      },
    ]
  },
  {
    id: 'cicatriz-keen',
    name: 'Cicatriz de Keen',
    faction: ['Keen'],
    type: 'Humanoide',
    level: 0.5,
    image: 'cicatriz-keen.png', // Sem imagem por padrão (quadrado vazio)
    description: 'Um bando de bárbaros violentos e fanáticos que invadiam as regiões montanhosas de Deheon vindos das uivantes. Eles ouviram o chamado de Keen e convergiam para um templo esquecido nos morros.',
    skills: [],
    lore: [
      {
        title: 'Família Perdida',
        text: 'Boa parte do bando foi derrotada e morta pelos futuros campeões de Arsenal quando investigavam a Cripta de Keen. Os feridos eventualmente fugiram, exceto por Haelga, uma das sobreviventes, que foi acolhida pelo grupo e tem se redimido.'
      },
    ]
  },
  {
    id: 'guardiao-cinzas',
    name: 'Guardião de Cinzas',
    faction: ['Keen'],
    type: 'Morto-vivo',
    level: 0.5,
    image: 'guardiao-cinzas.png', // Sem imagem por padrão (quadrado vazio)
    description: 'Guerreiros sagrados de épocas passadas reanimados pelo ódio residual do falecido deus Keen. Seus ossos enegrecidos ainda empunham armas e armaduras enferrujadas que se recusam a tombar na morte.',
    skills: [],
    lore: []
  },
  {
    id: 'lanca-keen',
    name: 'Lança de Keen',
    faction: ['Keen','Fullgor'],
    type: 'Espírito',
    level: 2,
    image: 'lanca-keen.png', // Sem imagem por padrão (quadrado vazio)
    description: 'Um antigo anjo da guerra aprisionado em um templo a Keen arruinado. Ele seguia protegendo o túmulo dos antigos membros da fé, mesmo após a queda do deus.',
    skills: [],
    lore: [
      {
        title: 'Lança Partida',
        text: 'Os futuros campeões de Arsenal observaram o anjo lentamente ser infectado pelo Fullgor, ao tentar se agarrar à fé defunta pelo deus Keen. Antes de sua transformação completa, ele foi derrotado e morto, e agradeceu pelo fim digno.'
      },
    ]
  },
];

/**
 * Lista de facções únicas presentes no Bestiário
 */
export const bestiarioFactions = [
  ...new Set(
    bestiarioData.flatMap(item => {
      const fac = item.faction ?? item.factions;
      return Array.isArray(fac) ? fac : (fac ? [fac] : []);
    })
  )
].sort();
