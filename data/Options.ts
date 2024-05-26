type Options = {
  produce: number;
  equipment: number;
  sellRaw: boolean;
  aging: number;
  planted: number;
  maxSeedMoney: number;
  days: number;
  fertilizer: number;
  level: number | undefined;
  season: number;
  buySeed: boolean;
  replant: boolean;
  nextyear: boolean;
  buyFert: boolean;
  average: boolean;
  fertilizerSource: number;
  seeds: {
    pierre: boolean;
    joja: boolean;
    special: boolean;
  };
  skills: {
    till: boolean;
    agri: boolean;
    arti: boolean;
    gatherer: boolean;
    botanist: boolean;
  };
  foodIndex: number;
  foodLevel: number;
  extra: boolean;
  disableLinks: boolean;
  foragingLevel?: number | undefined;
};

// Options used to draw the graph.
const options: Options = {
  produce: 0,
  equipment: 0,
  sellRaw: false,
  aging: 0,
  planted: 1,
  maxSeedMoney: 0,
  days: 28,
  fertilizer: 2,
  level: 0,
  season: 4,
  buySeed: false,
  replant: false,
  nextyear: false,
  buyFert: false,
  average: false,
  fertilizerSource: 0,
  seeds: {
    pierre: true,
    joja: true,
    special: true,
  },
  skills: {
    till: false,
    agri: false,
    arti: false,
    gatherer: false,
    botanist: false,
  },
  foodIndex: 0,
  foodLevel: 0,
  extra: false,
  disableLinks: false,
  foragingLevel:0,
};
export default options;
