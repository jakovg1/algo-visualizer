import { Dispatch, Key, SetStateAction, useState } from "react";
import "./Grid.scss";
import {
  CellType,
  defaultPersistVisualizationDelay,
  GridModel,
} from "./Grid.constants";
import { useDraggable, useDroppable, DndContext } from "@dnd-kit/core";

import {
  getBackgroundColorOfSquare,
  getClassnameOfSquare,
  getInlineHTMLOfSquare,
} from "./GridUtils.tsx";
import { BFS, stopAlgorithmAnimations } from "../algorithms/algorithms.tsx";
import GridDragNdrop from "./GridDragNdrop.tsx";

type GridProps = {
  gridModel: GridModel;
  setGridModel: Dispatch<SetStateAction<GridModel>>;
  algorithmVisualizationSpeed: number;
};

function Grid(gridProps: GridProps) {
  const { gridModel, setGridModel, algorithmVisualizationSpeed } = gridProps;
  const [algorithmRunning, setAlgorithmRunning] = useState(false);

  const handleClickOfEmptyCell = (i: number, j: number) => {
    setGridModel((oldGrid: GridModel) => {
      const newGrid = oldGrid.copyGrid();
      console.log(newGrid);
      //   newGrid[i][j].animation = false;
      //   newGrid[i][j].backgroundColor = { red: 0, green: 0, blue: 255 };
      switch (newGrid.getCell(i, j).type) {
        case CellType.EmptyExplored: {
          newGrid.getCell(i, j).type = CellType.Obstacle;
          break;
        }
        case CellType.EmptyUnexplored: {
          newGrid.getCell(i, j).type = CellType.Obstacle;
          break;
        }
        case CellType.Obstacle: {
          newGrid.getCell(i, j).type = CellType.EmptyUnexplored;
          break;
        }
      }
      return newGrid;
    });
  };

  const handleFindPathClicked = () => {
    stopAlgorithmAnimations();
    resetGrid();
    setAlgorithmRunning(true);
    const persistVisualizationDelay = defaultPersistVisualizationDelay;
    BFS(
      gridModel,
      setGridModel,
      handleXButtonClicked,
      persistVisualizationDelay,
      algorithmVisualizationSpeed
    );
  };

  const handleXButtonClicked = () => {
    stopAlgorithmAnimations();
    setAlgorithmRunning(false);
    resetGrid();
  };

  const handleRandomizeClicked = () => {
    stopAlgorithmAnimations();
    setGridModel(() => new GridModel(gridModel.dimension));
  };

  const resetGrid = () => {
    setGridModel((grid: GridModel) => {
      const newGrid = grid.copyGrid();
      const dimension = grid.dimension;
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          newGrid.getCell(i, j).animation = false;
          newGrid.getCell(i, j).backgroundColor = null;
          if (newGrid.getCell(i, j).type === CellType.EmptyExplored) {
            newGrid.getCell(i, j).type = CellType.EmptyUnexplored;
          }
        }
      }
      return newGrid;
    });
  };

  //drag n drop start and end squares
  const { isOver, setNodeRef: setNodeRefDroppable } = useDroppable({
    id: "droppable",
  });
  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefDraggable,
    transform,
  } = useDraggable({
    id: "draggable",
  });

  function renderGrid(grid: GridModel) {
    const { dimension, id } = grid;
    return (
      <DndContext>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${dimension}, 1fr)`,
            gridTemplateRows: `repeat(${dimension}, 1fr)`,
          }}
        >
          {grid.cells.map((row, i) =>
            row.map((cell, j) => {
              const key: Key = `${i}${j}${id}`;
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
      </DndContext>
    );
  }

  return (
    <>
      <div className="x-button-container">
        <i
          className={
            "fa-solid fa-xmark fa-2x x-button " +
            (algorithmRunning ? "appear" : "disappear")
          }
          onClick={() => handleXButtonClicked()}
        ></i>
      </div>
      {/* {renderGrid(gridModel)} */}
      <GridDragNdrop></GridDragNdrop>
      <span>
        <button className="button m-2" onClick={() => handleFindPathClicked()}>
          Find path
        </button>
        <button
          onClick={() => handleRandomizeClicked()}
          className="secondary-button"
        >
          Randomize
        </button>
      </span>
    </>
  );
}

export default Grid;
