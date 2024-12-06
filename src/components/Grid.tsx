import { Key } from "react";
import "./Grid.scss";
import { Button } from "@mantine/core";
import { SquareCell } from "./Grid.constants";

import {
  getInlineHTMLOfSquare,
  getStylingOfSquare,
  randomizeGridValues,
} from "./GridUtils.tsx";

function Grid(gridProps) {
  const { dimension, grid, setGrid } = gridProps;

  const handleClickOfEmptyCell = (i: number, j: number) => {
    setGrid((prevGrid: SquareCell[][]) => {
      const newGrid = [...prevGrid];
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
