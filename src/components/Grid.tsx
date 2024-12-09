import { Key } from "react";
import "./Grid.scss";
import { Cell, CellType } from "./Grid.constants";

import {
  getBackgroundColorOfSquare,
  getClassnameOfSquare,
  getInlineHTMLOfSquare,
  randomizeGridValues,
} from "./GridUtils.tsx";

function Grid(gridProps) {
  const { dimension, grid, setGrid } = gridProps;

  const handleClickOfEmptyCell = async (i: number, j: number) => {
    console.log(i, j);
    // if (grid[i][j].isAnimated) return; //??

    for (let c = 1; c < dimension; c++) {
      const [row1, col1] = [i + c, j];
      const [row2, col2] = [i - c, j];
      const [row3, col3] = [i, j + c];
      const [row4, col4] = [i, j - c];
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        if (c == 1) newGrid[i][j].animation = true;
        if (row1 < dimension) {
          newGrid[row1][col1].animation = true;
        }
        if (row2 >= 0) {
          newGrid[row2][col2].animation = true;
        }
        if (col3 < dimension) {
          newGrid[row3][col3].animation = true;
        }
        if (col4 >= 0) {
          newGrid[row4][col4].animation = true;
        }
        return newGrid;
      });
      await new Promise((resolve) => setTimeout(resolve, i * 10));
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // set animation to false:
    for (let c = 1; c < dimension; c++) {
      const [row1, col1] = [i + c, j];
      const [row2, col2] = [i - c, j];
      const [row3, col3] = [i, j + c];
      const [row4, col4] = [i, j - c];
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        if (c == 1) newGrid[i][j].animation = false;
        if (row1 < dimension) {
          newGrid[row1][col1].animation = false;
        }
        if (row2 >= 0) {
          newGrid[row2][col2].animation = false;
        }
        if (col3 < dimension) {
          newGrid[row3][col3].animation = false;
        }
        if (col4 >= 0) {
          newGrid[row4][col4].animation = false;
        }
        return newGrid;
      });
      await new Promise((resolve) => setTimeout(resolve, i * 10));
    }
  };

  const testing = () => {
    for (let i = 0; i < dimension; i++) {
      // for (let j = 0; i < dimension; j++) {
      setTimeout(() => {
        setGrid((oldGrid: Cell[][]) => {
          const newGrid = [...oldGrid];
          for (let k = 0; k < dimension; k++) {
            if (newGrid[i][k].backgroundColor) {
              newGrid[i][k].toggleAnimation();
            } else {
              newGrid[i][k].toggleAnimation();
            }
          }

          return newGrid;
        });
      }, i * 200);
      // }
    }
    //   grid[0][0].setBackgroundColor(0, 0, 0);
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
          row.map((square, j) => {
            const key: Key = `${i}${j}${dimension}`;
            return (
              <div
                key={key}
                className={"square " + getClassnameOfSquare(square, dimension)}
                style={getBackgroundColorOfSquare(square)}
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
      {/* <button
        onClick={() => setGrid(() => randomizeGridValues(dimension))}
        className="button"
      >
        Randomize
      </button> */}
      <button className="button" onClick={() => testing()}>
        Testing
      </button>
    </>
  );
}

export default Grid;
