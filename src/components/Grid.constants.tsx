export const defaultDimension = 5;
export const minDimension = 4;
export const maxDimension = 16;

export const emptyCellProbability = 0.6;

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
