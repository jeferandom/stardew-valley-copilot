type Fertilizers = Fertilizer[];

type Fertilizer = {
  name: string;
  ratio: number;
  growth: number;
  cost: number;
  alternate_cost?: number;
};

// Different fertilizers with their stats.
const fertilizers: Fertilizers = [
  {
    name: "None",
    ratio: 0,
    growth: 1,
    cost: 0,
  },
  {
    name: "Basic Fertilizer",
    ratio: 1,
    growth: 1,
    cost: 100,
  },
  {
    name: "Quality Fertilizer",
    ratio: 2,
    growth: 1,
    cost: 150,
  },
  {
    name: "Speed-Gro",
    ratio: 0,
    growth: 0.9,
    cost: 100,
  },
  {
    name: "Deluxe Speed-Gro",
    ratio: 0,
    growth: 0.75,
    cost: 150,
    alternate_cost: 80,
  },
  {
    name: "Deluxe Fertilizer",
    ratio: 3,
    growth: 1,
    cost: 0,
  },
  {
    name: "Hyper Speed-Gro",
    ratio: 0,
    growth: 0.67,
    cost: 0,
  },
];

export { fertilizers, Fertilizers, Fertilizer };
