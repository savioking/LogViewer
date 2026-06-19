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

export const campaignData = {
  id: 'tormenta-keen',
  title: 'Tormenta20: Fullgor dos Deuses',
  system: 'Tormenta20',
  description: '',
  characters: [
    {
      id: 'valkar',
      name: 'Valkar',
      race: 'Humano',
      class: 'Paladino',
      level: 2,
      deity: 'Khalmyr',
      attributes: { FOR: 16, DES: 10, CON: 14, INT: 10, SAB: 12, CAR: 16 },
      skills: ['Investida', 'Arma mágica', 'Combate a Cavalo'],
      description: 'Valkar é um cavaleiro honrado e fervoroso que luta em nome da justiça e do deus Khalmyr. Ele cavalga Aron, seu fiel unicórnio que o acompanha nas investidas contra o mal, trazendo chamas sagradas para purificar os slarks corrompidos.',
      mount: {
        name: 'Aron',
        species: 'Unicórnio',
        description: 'Uma criatura mágica de pura bravura, capaz de reduzir de tamanho temporariamente e baforar chamas purificadoras.'
      }
    },
    {
      id: 'kaelen',
      name: 'Kaelen',
      race: 'Humano',
      class: 'Arcanista (Mago)',
      level: 2,
      deity: 'Wynna',
      attributes: { FOR: 8, DES: 14, CON: 12, INT: 18, SAB: 14, CAR: 10 },
      skills: ['Armadura Arcana', 'Luz', 'Detectar Magia'],
      description: 'Kaelen é um conjurador perspicaz e cauteloso. Ele carrega uma lamparina e prefere manter a distância do perigo. Usa sua inteligência e magia de proteção (como a Armadura Arcana) para salvaguardar a si e ao grupo.'
    },
    {
      id: 'lukian',
      name: 'Lukian',
      race: 'Sulfure',
      class: 'Inventor',
      level: 2,
      deity: 'Nimb',
      attributes: { FOR: 10, DES: 16, CON: 12, INT: 18, SAB: 12, CAR: 10 },
      skills: ['Comandar', 'Remendo Rápido', 'Engenharia'],
      description: 'Lukian é um sulfure (meio-demônio) tenaz e inteligente. Ele luta com uma maça pesada e carrega uma medalha da família Penthacost. Está em uma busca desesperada por seu irmão desaparecido, Luin. Ele usa sua genialidade de inventor para comandar e coordenar os ataques de seus aliados no calor do combate.'
    },
    {
      id: 'adela',
      name: 'Adela Emyrsanis',
      race: 'Osteon (Humano)',
      class: 'Barda',
      level: 2,
      deity: 'Tenebra',
      attributes: { FOR: 8, DES: 16, CON: 10, INT: 14, SAB: 10, CAR: 18 },
      skills: ['Canção de Ninar', 'Florete Embutido', 'Consumir Elixir'],
      description: 'Uma barda esqueleto (Osteon) de elegância trágica. Ela toca acordes em seu violino, que esconde uma lâmina de florete em seu braço. Sendo morta-viva, ela se recupera despejando elixires de mana diretamente em sua mandíbula exposta, e viaja com seu pequeno companheiro animal, Atchim.'
    },
    {
      id: 'grakk',
      name: 'Grakk',
      race: 'Golem (de Carne)',
      class: 'Druida',
      level: 2,
      deity: 'Allihanna',
      attributes: { FOR: 18, DES: 10, CON: 16, INT: 10, SAB: 14, CAR: 8 },
      skills: ['Agarrar', 'Fúria da Natureza', 'Constituição de Golem'],
      description: 'Um construto biológico composto de tecidos corporais costurados, Grakk é um druida golem de carne. Embora possua grande força física e a capacidade de agarrar inimigos com as próprias mãos, ele possui um elo incomum com a natureza. Constantemente expressa frustração com o comportamento imprudente do grupo.'
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
          date: '19/02/2026',
          logText: fullgor_03
        },
        {
          id: 'sessao-4',
          title: '4. Ímpeto',
          date: '19/02/2026',
          logText: fullgor_04
        },
        {
          id: 'sessao-5',
          title: '5. Anjo',
          date: '19/02/2026',
          logText: fullgor_05
        },
        {
          id: 'sessao-6',
          title: '6. Mestre Arsenal',
          date: '19/02/2026',
          logText: fullgor_06
        }
      ]
    },
    {
      id: 'arco-2',
      title: 'Arco II: Promessa de Cinzas',
      description: 'Agora recrutados por Mestre Arsenal, o grupo viaja para Arvendhal em busca de um artefato perdido.',
      sessions: [
        {
          id: 'sessao-7',
          title: '7. Morto',
          date: '12/02/2026',
          logText: fullgor_07
        },
        {
          id: 'sessao-8',
          title: '8. Porcos',
          date: '12/02/2026',
          logText: fullgor_08
        },
        {
          id: 'sessao-9',
          title: '9. Armadilha',
          date: '12/02/2026',
          logText: fullgor_09
        },
        {
          id: 'sessao-10',
          title: '10. Mecanismo',
          date: '12/02/2026',
          logText: fullgor_10
        },
        {
          id: 'sessao-11',
          title: '11. Minas',
          date: '12/02/2026',
          logText: fullgor_11
        },
        {
          id: 'sessao-12',
          title: '12. Slarks',
          date: '12/02/2026',
          logText: fullgor_12
        },
        {
          id: 'sessao-13',
          title: '13. Escuridão',
          date: '12/02/2026',
          logText: fullgor_13
        },
        {
          id: 'sessao-14',
          title: '14. Miriane',
          date: '12/02/2026',
          logText: fullgor_14
        },
        {
          id: 'sessao-15',
          title: '15. Fosso',
          date: '12/02/2026',
          logText: fullgor_15
        },
      ]
    }
  ]
};
