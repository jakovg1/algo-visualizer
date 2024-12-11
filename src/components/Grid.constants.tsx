export const defaultDimension = 10;
export const minDimension = 5;
export const maxDimension = 30;

export const emptyCellProbability = 0.6;

export const defaultPersistVisualizationDelay = 2000;

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
