import { Key, useRef, useState } from "react";
import "./Grid.scss";
import { Cell, CellType } from "./Grid.constants";

import {
  getBackgroundColorOfSquare,
  getClassnameOfSquare,
  getInlineHTMLOfSquare,
  randomizeGridValues,
} from "./GridUtils.tsx";
import { BFS } from "../algorithms/algorithms.tsx";

function Grid(gridProps) {
  const { dimension, grid, setGrid } = gridProps;
  let resetGridTimeout = useRef<number>(-1);
  let [algorithmRunning, setAlgorithmRunning] = useState(false);

  const handleClickOfEmptyCell = (i: number, j: number) => {
    setGrid((grid: Cell[][]) => {
      const newGrid = [...grid];
      //   newGrid[i][j].animation = false;
      //   newGrid[i][j].backgroundColor = { red: 0, green: 0, blue: 255 };
      switch (newGrid[i][j].type) {
        case CellType.EmptyExplored: {
          newGrid[i][j].type = CellType.Obstacle;
          break;
        }
        case CellType.EmptyUnexplored: {
          newGrid[i][j].type = CellType.Obstacle;
          break;
        }
        case CellType.Obstacle: {
          newGrid[i][j].type = CellType.EmptyUnexplored;
          break;
        }
      }
      return newGrid;
    });
  };

  const findPath = () => {
    setAlgorithmRunning(true);
    BFS(grid, setGrid);
    // setAlgorithmRunning(false);

    //reset grid
    clearTimeout(resetGridTimeout.current);
    resetGridTimeout.current = setTimeout(() => {
      resetGrid();
    }, 10000);
  };

  const resetGrid = () => {
    setGrid((grid: Cell[][]) => {
      const newGrid = [...grid];
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          grid[i][j].animation = false;
          grid[i][j].backgroundColor = null;
          if (grid[i][j].type === CellType.EmptyExplored) {
            grid[i][j].type = CellType.EmptyUnexplored;
          }
        }
      }
      return newGrid;
    });
  };

  function renderGrid(grid: Cell[][]) {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => {
            const key: Key = `${i}${j}${dimension}`;
            return (
              <div
                key={key}
                className={"square " + getClassnameOfSquare(cell, dimension)}
                style={getBackgroundColorOfSquare(cell)}
                onClick={() => handleClickOfEmptyCell(i, j)}
              >
                {getInlineHTMLOfSquare(cell, dimension)}
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <>
      <div className="w-75 d-flex flex-row-reverse">
        {algorithmRunning && (
          <i
            className="fa-solid fa-xmark fa-2x x-button"
            onClick={() =>
              setAlgorithmRunning(() => {
                resetGrid();
                return false;
              })
            }
          ></i>
        )}
      </div>
      {renderGrid(grid)}
      <span>
        <button className="button m-2" onClick={() => findPath()}>
          Find path
        </button>
        <button
          onClick={() => setGrid(() => randomizeGridValues(dimension))}
          className="button"
        >
          Randomize
        </button>
      </span>
    </>
  );
}

export default Grid;
