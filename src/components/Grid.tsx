import React, { Key, useState } from "react";
import "./Grid.scss";
import { Button, Slider } from "@mantine/core";
import {
  defaultDimension,
  maxDimension,
  minDimension,
  SquareCell,
} from "./Grid.constants";

import {
  GetArrayOfInts,
  getInlineHTMLOfSquare,
  getStylingOfSquare,
  randomizeGridValues,
} from "./GridUtils.tsx";

function Grid() {
  const [dimension, changeDimension] = useState(defaultDimension);
  const [grid, setGrid] = useState(randomizeGridValues(dimension));

  const handleClickOfEmptyCell = (i: number, j: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      //   const newGrid = prevGrid;
      let cell = newGrid[i][j];
      if (cell === SquareCell.Empty) {
        cell = SquareCell.Obstacle;
      } else if (cell === SquareCell.Obstacle) {
        cell = SquareCell.Empty;
      }
      newGrid[i][j] = cell;
      return newGrid;
    });
  };

  //Slider
  const sliderMarks = [
    ...GetArrayOfInts(minDimension, maxDimension).map((num) => {
      return { value: num, label: num };
    }),
  ];

  function renderGrid(grid: SquareCell[][]) {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((square, j) => {
            const key: Key = `${i}${j}${dimension}`;
            return (
              <div
                key={key}
                className={"square " + getStylingOfSquare(square, dimension)}
                onDragOver={() => handleClickOfEmptyCell(i, j)}
                onClick={() => handleClickOfEmptyCell(i, j)}
              >
                {getInlineHTMLOfSquare(square)}
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <>
      <div className="w-50 center pb-4">
        <Slider
          min={minDimension}
          max={maxDimension}
          value={dimension}
          onChange={(dimensionValue) =>
            changeDimension((oldDimensionValue) => {
              if (oldDimensionValue === dimensionValue) return dimensionValue;
              setGrid(() => {
                const newGrid = randomizeGridValues(dimensionValue);
                return newGrid;
              });
              return dimensionValue;
            })
          }
          color="rgba(9, 0, 0, 1)"
          radius="xs"
          marks={sliderMarks}
        />
      </div>

      {renderGrid(grid)}
      <Button
        onClick={() => setGrid(() => randomizeGridValues(dimension))}
        className="button"
      >
        Randomize
      </Button>
    </>
  );
}

export default Grid;
