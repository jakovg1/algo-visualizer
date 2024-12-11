export const defaultDimension = 15;
export const minDimension = 5;
export const maxDimension = 30;

export const emptyCellProbability = 0.7;

export const defaultAlgorithmVisualizationDelay = 100;
export const minAlgorithmVisualizationDelay = 1;
export const maxAlgorithmVisualizationDelay = 200;

export const defaultPersistVisualizationDelay = 5000;

export const myGithubUrl: string = "https://github.com/jakovg1";

interface Color {
  red: number;
  green: number;
  blue: number;
}

export enum CellType {
  PointA,
  PointB,
  EmptyUnexplored,
  EmptyExplored,
  Obstacle,
}
export class Cell {
  type: CellType;
  backgroundColor: Color | null;
  animation: boolean;

  constructor(
    type: CellType,
    backgroundColor: Color | null,
    animation?: boolean
  ) {
    this.type = type;
    this.backgroundColor = backgroundColor;
    this.animation = animation || false;
  }

  hasBackgroundColor(): boolean {
    return !!this.backgroundColor;
  }

  toggleAnimation(): void {
    this.animation = !this.animation;
  }

  isAnimated(): boolean {
    return this.animation;
  }

  setBackgroundColor(red: number, green: number, blue: number): void {
    this.backgroundColor = { red, green, blue };
  }

  resetBackgorundColor(): void {
    this.backgroundColor = null;
  }
}

export const interpolatedColors: string[] = [
  "#00585f",
  "#006368",
  "#006f70",
  "#007a76",
  "#00867c",
  "#009280",
  "#009d83",
  "#00a984",
  "#00b585",
  "#00c184",
  "#00cc81",
  "#00d87e",
];
