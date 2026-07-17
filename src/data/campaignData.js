// import logExampleText from '../../log-example.txt?raw';
import fullgor_01 from './fullgor-dos-deuses/01.txt?raw';
import fullgor_02 from './fullgor-dos-deuses/02.txt?raw';
import fullgor_03 from './fullgor-dos-deuses/03.txt?raw';
import fullgor_04 from './fullgor-dos-deuses/04.txt?raw';
import fullgor_05 from './fullgor-dos-deuses/05.txt?raw';
import fullgor_06 from './fullgor-dos-deuses/06.txt?raw';

import fullgor_07 from './fullgor-dos-deuses/07.txt?raw';
import fullgor_08 from './fullgor-dos-deuses/08.txt?raw';
import fullgor_09 from './fullgor-dos-deuses/09.txt?raw';
import fullgor_10 from './fullgor-dos-deuses/10.txt?raw';
import fullgor_11 from './fullgor-dos-deuses/11.txt?raw';
import fullgor_12 from './fullgor-dos-deuses/12.txt?raw';
import fullgor_13 from './fullgor-dos-deuses/13.txt?raw';
import fullgor_14 from './fullgor-dos-deuses/14.txt?raw';
import fullgor_15 from './fullgor-dos-deuses/15.txt?raw';
import fullgor_16 from './fullgor-dos-deuses/16.txt?raw';
import fullgor_17 from './fullgor-dos-deuses/17.txt?raw';
import fullgor_18 from './fullgor-dos-deuses/18.txt?raw';
import fullgor_19 from './fullgor-dos-deuses/19.txt?raw';
import fullgor_20 from './fullgor-dos-deuses/20.txt?raw';
import fullgor_21 from './fullgor-dos-deuses/21.txt?raw';

export const campaignData = {
  id: 'tormenta-keen',
  title: 'Fullgor dos Deuses',
  system: 'Tormenta20',
  description: '',
  characters: [
    {
      id: 'valkar',
      name: 'Valkar',
      race: 'Qareen',
      class: 'Paladino',
      level: 2,
      deity: 'Khalmyr',
      attributes: { FOR: 0, DES: -1, CON: 1, INT: 4, SAB: -2, CAR: 6 },
      skills: ['Investida Montada', 'Arma Mágica', 'Instante Estóico'],
      description: 'Valkar é um cavaleiro honrado que luta em nome da justiça e do deus Khalmyr. Ele cavalga Aron, seu fiel unicórnio que o acompanha nas investidas contra o mal, trazendo as chamas sagradas de sua terra além das estrelas.',
      mount: {
        name: 'Aron',
        species: 'Montaria - Unicórnio',
        description: 'Uma criatura mágica de pura bravura, ainda jovem, mas eternamente leal ao seu cavaleiro.'
      },
      story: []
    },
    {
      id: 'kaelen',
      name: 'Kaelen',
      race: 'Humano',
      class: 'Arcanista (Feiticeiro)',
      level: 2,
      deity: '',
      attributes: { FOR: 3, DES: 0, CON: 3, INT: -1, SAB: 0, CAR: 5 },
      skills: ['Armadura Arcana', 'Sono'],
      description: 'Kaelen é um conjurador perspicaz, mas apesar de sua sagacidade, perdeu a memória de sua vida pregressa. Desde então, age como aventureiro, tentando recobrar pedaços de quem era e descobrir um propósito.',
      story: [
        {
          title: 'Despertar',
          text: 'A primeira memória de Kaelen é de acordar em uma caverna escura, repleta de morte e desolação. Ele fugiu e eventualmente encontrou uma alma solidária em Brunna Martelo-de-Carvalho, uma anã que o acolheu enquanto entendia o que havia acontecido.'
        },
        {
          title: 'Fragmentos de Aprendizado',
          text: 'Ao ouvir falar da divindade Beluhga, Kaelen recobra memórias de estar em uma sala de aula aprendendo sobre magia, em especial, sobre os Dragões-Rei e como eles representam aspectos da magia arcana. Kaelen estava entediado, pois lembrava de saber disso tudo a partir da sua família, e preferia provar a sopa da qual sentia um cheiro delicioso.'
        }
      ]
      
    },
    {
      id: 'lukian',
      name: 'Lukian',
      race: 'Sulfure',
      class: 'Inventor',
      level: 2,
      deity: '',
      attributes: { FOR: -1, DES: 3, CON: 1, INT: 3, SAB: 1, CAR: 2 },
      skills: ['Comandar', 'Engenhosidade'],
      description: 'Lukian é um sulfure herdeiro de uma família nobre desgraçada. Sua casa foi tomada à força com uma insurreição contra a herança demoníaca de seu sangue, uma desculpa para apanhar poder. Desde então, ele vaga pelo mundo, fazendo juz ao legado de invenções de seus pares, e tentando se reencontrar com seus irmãos perdidos.',
      story: [
        {
          title: 'A Queda dos Penthacost',
          text: 'A união entre o pai de Lukian, um inventor renomado, e sua mãe, uma nativa demoníaca de um dos mundos divinos, sempre foi rejeitada por sua família tradicional. Lukian e seus irmãos sofreram a pior perda de suas vidas quando os autômatos da residência de família se viraram contra seus pais. Seu tio Vortigan culpou a influência demoníaca, mas Lukian sabia que ele foi o culpado ao vislumbrar sua marca pessoal nos autômatos. Ele foi preso para ser silenciado, mas conseguiu escapar com dois de seus irmãos, Luin e Mirin. Eles se separaram para despistar os perseguidores, e Lukian nunca mais os viu.'
        },
        {
          title: 'Sigilo Abandonado',
          text: 'Lukian descobriu de um mercador viajante um dos brasões de sua família, algo que apenas ele ou seus irmãos possuiriam. O mercador disse que recebeu de um homem como Lukian, sulfure, em uma cidade próxima chamada Arvendhal.'
        }
      ]
    },
    {
      id: 'adela',
      name: 'Adela Emyrsanis',
      race: 'Osteon (Sereia)',
      class: 'Barda',
      level: 2,
      deity: '',
      attributes: { FOR: 0, DES: 2, CON: 0, INT: 1, SAB: 2, CAR: 4 },
      skills: ['Inspiração', 'Sortuda'],
      description: 'Uma barda osteon de elegância trágica. Nascida aristocrata de Portsmouth, era parte de uma família secreta de sereias e tritões. Fora dos planos do Conde Asloth, quando o reino se cobriu de necromancia, ela morreu... mas retornou mudada. Como morta-viva, descobriu o dom musical, que agora espalha para quem lhe der ouvidos.',
      mount: {
        name: 'Atchim',
        species: 'Especial - Elemental',
        description: 'Uma faísca misturada com fagulha. Atchim é um elemental composto da energia do fogo e da eletricidade, algo extremamente inusitado. Foi encontrado habitando um velho construto abandonado.'
      },
      story: [
        {
          title: 'Fuga do Necromante',
          text: 'Ficar em Portsmouth, agora Aslothia, não era uma opção, mesmo após sua transformação. Tentando escapar, Adela conheceu ???, uma outra fugitiva do reino. Devota de Arsenal, ela a convidou a se tornar parte dos esforços do deus, e a instruiu que fosse até Deheon.'
        }
      ]
    },
    {
      id: 'grakk',
      name: 'Grakk',
      race: 'Golem (de Carne)',
      class: 'Druida',
      level: 2,
      deity: 'Panteão',
      attributes: { FOR: 3, DES: -1, CON: 3, INT: -1, SAB: 4, CAR: 1 },
      skills: ['Falar com Espíritos'],
      description: 'Um construto biológico composto de tecidos corporais costurados, Grakk surgiu de Arton e vive por ela. Tem meses de vida, e ainda está aprendendo o que isso significa, mas brande poderes druídicos instintivos enquanto protege os vivos a todo custo.',
      mount: {
        name: 'Haelga',
        species: 'Bruta',
        description: 'Uma bárbara das uivantes, que ficou sem bando. Resolveu acompanhar os aventureiros por terem poupado sua vida. Grakk tenta levá-la para meios pacíficos.'
      },
      story: [
        {
          title: 'Nascimento',
          text: 'Grakk surgiu numa floresta do noroeste de Deheon sem aparente explicação. Brotou do chão como um vegetal, mas ergueu-se como gente. Perambulou sem rumo apreciando aquilo que aprenderia a chamar de vida, até encontrar um grupo de aventureiros.'
        },
        {
          title: 'Arsenal',
          text: 'Após desbravar uma cripta tomada por uma ameaça a própria Arton, Grakk foi convidado a se tornar um "soldado" na guerra por vir de Mestre Arsenal. O Deus da guerra lhe conferiu sua bênção, após parecer familiar com quem ele era.'
        }
      ]
    }
  ],
  arcs: [
    {
      id: 'arco-1',
      title: 'Arco I: A Cripta de Keen',
      description: 'O grupo investiga uma antiga cripta, reza a lenda, que foi o último descanso do falecido deus da guerra.',
      sessions: [
        {
          id: 'sessao-1',
          title: '1. Desastre',
          date: '12/02/2026',
          logText: fullgor_01
        },
        {
          id: 'sessao-2',
          title: '2. Frio',
          date: '19/02/2026',
          logText: fullgor_02
        },
        {
          id: 'sessao-3',
          title: '3. Nojo',
          date: '26/02/2026',
          logText: fullgor_03
        },
        {
          id: 'sessao-4',
          title: '4. Ímpeto',
          date: '05/03/2026',
          logText: fullgor_04
        },
        {
          id: 'sessao-5',
          title: '5. Anjo',
          date: '19/03/2026',
          logText: fullgor_05
        },
        {
          id: 'sessao-6',
          title: '6. Mestre Arsenal',
          date: '26/03/2026',
          logText: fullgor_06
        }
      ]
    },
    {
      id: 'arco-2',
      title: 'Arco II: Promessa de Cinzas',
      description: 'Agora recrutados por Mestre Arsenal, o grupo viaja para Arvendhal em busca de um artefato roubado.',
      sessions: [
        {
          id: 'sessao-7',
          title: '7. Morto',
          date: '03/04/2026',
          logText: fullgor_07
        },
        {
          id: 'sessao-8',
          title: '8. Porcos',
          date: '09/04/2026',
          logText: fullgor_08
        },
        {
          id: 'sessao-9',
          title: '9. Armadilha',
          date: '16/04/2026',
          logText: fullgor_09
        },
        {
          id: 'sessao-10',
          title: '10. Mecanismo',
          date: '08/05/2026',
          logText: fullgor_10
        },
        {
          id: 'sessao-11',
          title: '11. Minas',
          date: '14/05/2026',
          logText: fullgor_11
        },
        {
          id: 'sessao-12',
          title: '12. Slarks',
          date: '28/05/2026',
          logText: fullgor_12
        },
        {
          id: 'sessao-13',
          title: '13. Escuridão',
          date: '04/06/2026',
          logText: fullgor_13
        },
        {
          id: 'sessao-14',
          title: '14. Miriane',
          date: '11/06/2026',
          logText: fullgor_14
        },
        {
          id: 'sessao-15',
          title: '15. Fosso',
          date: '18/06/2026',
          logText: fullgor_15
        },
        {
          id: 'sessao-16',
          title: '16. Estranho',
          date: '25/06/2026',
          logText: fullgor_16
        },
        {
          id: 'sessao-17',
          title: '17. Traição',
          date: '26/06/2026',
          logText: fullgor_17
        },
        {
          id: 'sessao-18',
          title: '18. Catarse',
          date: '03/07/2026',
          logText: fullgor_18
        },
        {
          id: 'sessao-19',
          title: '19. Promessa das Cinzas',
          date: '10/07/2026',
          logText: fullgor_19
        },
        {
          id: 'sessao-20',
          title: '20. Avatar',
          date: '11/07/2026',
          logText: fullgor_20
        },
        {
          id: 'sessao-21',
          title: '21. Avatar',
          date: '17/07/2026',
          logText: fullgor_21
        },
      ]
    }
  ],
  mapPoints: [
    {
      id: 'p1',
      x: 20.8,
      y: 53,
      title: 'Gorendill',
      description: 'Uma vila breve nos limites de Deheon com as Uivantes.'
    },
    {
      id: 'p2',
      x: 23,
      y: 50,
      title: 'Cripta de Keen',
      description: 'Um mítico templo do antigo deus da guerra, oculto nos morros gélidos do oeste de Deheon.'
    },
    {
      id: 'p3',
      x: 30,
      y: 55,
      title: 'Arvendhal',
      description: 'Uma velha cidade mineradora, esquecida quando as minas secaram. O povo carrancudo é rancoroso com a coroa.'
    }
  ]
};
