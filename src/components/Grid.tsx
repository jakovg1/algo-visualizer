import React, { useState } from "react";
import "./Grid.scss";
import { Slider } from "@mantine/core";
import {
  defaultDimension,
  maxDimension,
  minDimension,
  SquareCell,
} from "./Grid.constants";

function MakeSquareMatrix(n: number): SquareCell[][] {
  return Array.from({ length: n }).map(() => Array(n).fill(SquareCell.Empty));
}

function GetArrayOfInts(begin: number, end: number): Array<number> {
  const arr: Array<number> = [];
  while (begin <= end) {
    arr.push(begin++);
  }
  return arr;
}

// Util functions for Grid
// function isCellPointA(grid: SquareCell[][], i: number, j: number): boolean {
//   return grid[i][j] === SquareCell.PointA;
// }
// function isCellPointB(grid: SquareCell[][], i: number, j: number): boolean {
//   return grid[i][j] === SquareCell.PointB;
// }
// function isCellObstacle(grid: SquareCell[][], i: number, j: number): boolean {
//   return grid[i][j] === SquareCell.Obstacle;
// }

function getStylingOfSquare(square: SquareCell): string {
  if (square === SquareCell.PointA) return "pointA";
  if (square === SquareCell.PointB) return "pointB";
  if (square === SquareCell.Obstacle) return "obstacle";
  return "";
}

function getInlineHTMLOfSquare(square: SquareCell): string {
  if (square === SquareCell.PointA) return "A";
  if (square === SquareCell.PointB) return "B";
  return "";
}
////////////////////////////////////////////////////////////////////////

function Grid() {
  const [dimension, changeDimension] = useState(defaultDimension);
  const grid: SquareCell[][] = MakeSquareMatrix(dimension);

  grid[0][0] = SquareCell.PointA;
  grid[3][3] = SquareCell.PointB;
  grid[1][1] = SquareCell.Obstacle;
  grid[1][2] = SquareCell.Obstacle;

  //Slider
  const sliderMarks = [
    ...GetArrayOfInts(minDimension, maxDimension).map((num) => {
      return { value: num, label: num };
    }),
  ];

  return (
    <>
      <div className="w-50 center pb-4">
        <Slider
          min={minDimension}
          max={maxDimension}
          value={dimension}
          onChange={(value) => changeDimension(value)}
          color="rgba(9, 0, 0, 1)"
          radius="xs"
          marks={sliderMarks}
        />
      </div>

      {grid.map((row, i) => (
        <span key={i} className="row">
          {row.map((square, j) => (
            <div key={j} className={"square " + getStylingOfSquare(square)}>
              {getInlineHTMLOfSquare(square)}
            </div>
          ))}
        </span>
      ))}
    </>
  );
}

export default Grid;
