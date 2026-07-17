export const pointCosts = {
  "-1": -1,
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 4,
  "4": 7,
};

export const races = [
  {
    id: "humano",
    name: "Humano",
    description: "+1 em Três Atributos Diferentes",
    bonuses: {},
    choice: { points: 3, mode: 'different', restricted: [] }
  },
  {
    id: "anao",
    name: "Anão",
    description: "Constituição +2, Sabedoria +1, Destreza -1",
    bonuses: { CON: 2, SAB: 1, DES: -1 }
  },
  {
    id: "dahllan",
    name: "Dahllan",
    description: "Sabedoria +2, Destreza +1, Inteligência -1",
    bonuses: { SAB: 2, DES: 1, INT: -1 }
  },
  {
    id: "elfo",
    name: "Elfo",
    description: "Inteligência +2, Destreza +1, Constituição -1",
    bonuses: { INT: 2, DES: 1, CON: -1 }
  },
  {
    id: "goblin",
    name: "Goblin",
    description: "Destreza +2, Inteligência +1, Carisma -1",
    bonuses: { DES: 2, INT: 1, CAR: -1 }
  },
  {
    id: "lefou",
    name: "Lefou",
    description: "+1 em Três Atributos Diferentes (Exceto Carisma), Carisma -1",
    bonuses: { CAR: -1 },
    choice: { points: 3, mode: 'different', restricted: ['CAR'] }
  },
  {
    id: "minotauro",
    name: "Minotauro",
    description: "Força +2, Constituição +1, Sabedoria -1",
    bonuses: { FOR: 2, CON: 1, SAB: -1 }
  },
  {
    id: "qareen",
    name: "Qareen",
    description: "Carisma +2, Inteligência +1, Sabedoria -1",
    bonuses: { CAR: 2, INT: 1, SAB: -1 }
  },
  {
    id: "golem",
    name: "Golem",
    description: "Força +1, Carisma -1. Mais bônus de chassi (livre para escolher)",
    bonuses: { FOR: 1, CAR: -1 },
    choice: { points: 99999, mode: 'free', restricted: [] }
  },
  {
    id: "hynne",
    name: "Hynne",
    description: "Destreza +2, Carisma +1, Força -1",
    bonuses: { FOR: -1, CAR: 1, DES: 2 },
  },
  {
    id: "kliren",
    name: "Kliren",
    description: "Inteligência +2, Carisma +1, Força -1",
    bonuses: { FOR: -1, CAR: 1, INT: 2 },
  },
  {
    id: "medusa",
    name: "Medusa",
    description: "Destreza +2, Carisma +1",
    bonuses: {CAR: 1, DES: 2 },
  },
  {
    id: "osteon",
    name: "Osteon",
    description: "+1 em Três Atributos Diferentes (Exceto Constituição), Constituição -1",
    bonuses: { CON: -1},
    choice: { points: 3, mode: 'different', restricted: ['CON'] }
  },
  {
    id: "sereia-tritao",
    name: "Sereia/Tritão",
    description: "+1 em Três Atributos Diferentes",
    bonuses: { },
    choice: { points: 3, mode: 'different', restricted: [] }
  },
  {
    id: "silfide",
    name: "Sílfide",
    description: "Carisma +2, Destreza +1, Força -2",
    bonuses: { CAR: 2, DES: 1, FOR: -2 }
  },
  {
    id: "suraggel-aggelus",
    name: "Suraggel (Aggelus)",
    description: "Sabedoria +2, Carisma +1",
    bonuses: {CAR: 1, SAB: 2 },
  },
  {
    id: "suraggel-sulfure",
    name: "Suraggel (Sulfure)",
    description: "Destreza +2, Inteligência +1",
    bonuses: {INT: 1, DES: 2 },
  },
  {
    id: "trog",
    name: "Trog",
    description: "Constituição +2, Força +1, Inteligência -1",
    bonuses: { CON: 2, FOR: 1, INT: -2 }
  },
  {
    id: "kallyanach",
    name: "Kallyanach",
    description: "+2 em um único atributo ou +1 em dois atributos.",
    bonuses: {},
    choice: { points: 2, mode: 'stackable', restricted: [] }
  },
  {
    id: "meio-orc",
    name: "Meio-Orc",
    description: "Força +2, +1 em um outro atributo (Exceto Carisma)",
    bonuses: { FOR: 2 },
    choice: { points: 1, mode: 'different', restricted: ['FOR', 'CAR'] }
  },
  
];
