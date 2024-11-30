import React, { useState } from "react";
import "./Grid.scss";
import { Button, Slider } from "@mantine/core";
import { defaultDimension, maxDimension, minDimension } from "./Grid.constants";

function MakeSquareMatrix(n: number): number[][] {
  return Array.from({ length: n }).map(() => Array(n).fill(0));
}

function GetArrayOfInts(begin: number, end: number): Array<number> {
  const arr: Array<number> = [];
  while (begin <= end) {
    arr.push(begin++);
  }
  return arr;
}

function Grid() {
  const [dimension, changeDimension] = useState(defaultDimension);
  const grid: boolean[][] = MakeSquareMatrix(dimension);

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
            <p key={j} className="square">
              {/* {square} */}
            </p>
          ))}
        </span>
      ))}
    </>
  );
}

export default Grid;
