import { emptyCellProbability, SquareCell } from "./Grid.constants";

// util functions

export function getRandBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getTrueValueWithProbability(probability: number): boolean {
  if (probability < 0 || probability > 1) return false;
  return probability > Math.random();
}

export function MakeSquareMatrix(n: number): SquareCell[][] {
  return Array.from({ length: n }).map(() => Array(n).fill(SquareCell.Empty));
}

export function GetArrayOfInts(begin: number, end: number): Array<number> {
  const arr: Array<number> = [];
  while (begin <= end) {
    arr.push(begin++);
  }
  return arr;
}

export function randomizeGridValues(dimension: number) {
  let [pointARow, pointAColumn, pointBRow, pointBColumn]: number[] = [
    getRandBetween(0, dimension),
    getRandBetween(0, dimension),
    getRandBetween(0, dimension),
    getRandBetween(0, dimension),
  ];
  //choose point B to have a different row and column from point A
  if (pointARow === pointBRow) {
    pointBRow = (pointBRow + getRandBetween(1, dimension)) % dimension;
  }
  if (pointAColumn === pointBColumn) {
    pointBColumn = (pointBColumn + getRandBetween(1, dimension)) % dimension;
  }

  const grid: SquareCell[][] = MakeSquareMatrix(dimension);
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      grid[i][j] = getTrueValueWithProbability(emptyCellProbability)
        ? SquareCell.Empty
        : SquareCell.Obstacle;
    }
  }
  grid[pointARow][pointAColumn] = SquareCell.PointA;
  grid[pointBRow][pointBColumn] = SquareCell.PointB;
  return grid;
}

export function getStylingOfSquare(
  square: SquareCell,
  dimension: number
): string {
  let squareTypeStyling = "";
  const smallTextStyling = dimension > 10 ? "small-text" : "";

  if (square === SquareCell.PointA) squareTypeStyling = "pointA";
  else if (square === SquareCell.PointB) squareTypeStyling = "pointB";
  else if (square === SquareCell.Obstacle) squareTypeStyling = "obstacle";
  else squareTypeStyling = "";
  return `${squareTypeStyling} ${smallTextStyling}`;
}

export function getInlineHTMLOfSquare(square: SquareCell): string {
  if (square === SquareCell.PointA) return "A";
  if (square === SquareCell.PointB) return "B";
  return " ";
}
