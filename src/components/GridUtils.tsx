import { CSSProperties } from "react";
import { emptyCellProbability, Cell, CellType } from "./Grid.constants";

// util functions

export function getRandBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getTrueValueWithProbability(probability: number): boolean {
  if (probability < 0 || probability > 1) return false;
  return probability > Math.random();
}

export function MakeSquareMatrix(n: number): Cell[][] {
  return Array.from({ length: n }).map(() => Array(n).fill(Cell.Empty));
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

  const grid: Cell[][] = MakeSquareMatrix(dimension);
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      grid[i][j] = getTrueValueWithProbability(emptyCellProbability)
        ? new Cell(CellType.EmptyUnexplored, null)
        : new Cell(CellType.Obstacle, null);
    }
  }
  grid[pointARow][pointAColumn] = new Cell(CellType.PointA, null);
  grid[pointBRow][pointBColumn] = new Cell(CellType.PointB, null);
  return grid;
}

export function getClassnameOfSquare(cell: Cell, dimension: number): string {
  let squareTypeStyling = "";
  const smallTextStyling = dimension > 10 ? "small-text" : "";

  const squareType = cell.type;

  if (squareType === CellType.PointA) squareTypeStyling = "pointA";
  else if (squareType === CellType.PointB) squareTypeStyling = "pointB";
  else if (squareType === CellType.Obstacle) squareTypeStyling = "obstacle";
  else squareTypeStyling = "";
  const algorithmRunning =
    cell.isAnimated() && squareTypeStyling === "" ? "algorithm-running" : "";

  return `${squareTypeStyling} ${smallTextStyling} ${algorithmRunning}`;
}

export function getBackgroundColorOfSquare(
  square: Cell
): CSSProperties | undefined {
  if (!square.backgroundColor) return {};
  const { red, green, blue } = square.backgroundColor;
  const style = { backgroundColor: `rgb(${red},${green},${blue})` };
  return style;
}

export function getInlineHTMLOfSquare(cell: Cell, dimension: number): string {
  if (dimension > 12) return "";
  const squareType = cell.type;
  if (squareType === CellType.PointA) return "A";
  if (squareType === CellType.PointB) return "B";
  return " ";
}
