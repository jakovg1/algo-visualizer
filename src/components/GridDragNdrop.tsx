import React, { Key, useState } from "react";
import { MakeSquareMatrix } from "./GridUtils";
import { CellType, GridModel } from "./Grid.constants";
import { DndContext } from "@dnd-kit/core";
import "./Grid.scss";
import GridDroppableItem from "./GridDroppableItem";
import GridDraggableItem from "./GridDraggableItem";

function GridDragNdrop() {
  const dimension = 6;
  const [gridModel, setGridModel] = useState(new GridModel(dimension));

  function renderGrid(gridModel: GridModel) {
    return gridModel.cells.map((row, i) =>
      row.map((square, j) => {
        const isStart = square.type === CellType.PointA;
        const isEnd = square.type === CellType.PointB;
        const isNormalCell = !isStart && !isEnd;

        const id = gridModel.id;
        const key: Key = `${i}${j}${id}`;
        const dropId = `${i}_${j}_${isStart ? "S" : ""}${isEnd ? "E" : ""}${
          isNormalCell ? "N" : ""
        }`;
        return (
          <GridDroppableItem
            key={key}
            id={dropId}
            isStart={isStart}
            isEnd={isEnd}
            cell={square}
          >
            {isStart ? (
              <GridDraggableItem id={dropId} label="START"></GridDraggableItem>
            ) : (
              ""
            )}
            {isEnd ? (
              <GridDraggableItem id={dropId} label="END"></GridDraggableItem>
            ) : (
              ""
            )}
          </GridDroppableItem>
        );
      })
    );
  }

  function handleDragEnd(event) {
    // console.log(event);
    if (!event.over) return;
    let [iActive, jActive, iOver, jOver] = [0, 0, 0, 0];
    const activeStr = event.active.id.split("_");
    console.log(activeStr);
    const overStr = event.over.id.split("_");
    console.log(overStr);
    iActive = parseInt(activeStr[0]);
    jActive = parseInt(activeStr[1]);
    iOver = parseInt(overStr[0]);
    jOver = parseInt(overStr[1]);

    if (overStr[2] !== "N") return;

    setGridModel((oldGrid) => {
      const newGrid = oldGrid.copyGrid();
      if (activeStr[2] === "S") {
        newGrid.getCell(iActive, jActive).type = CellType.EmptyUnexplored;
        newGrid.getCell(iOver, jOver).type = CellType.PointA;
      }
      if (activeStr[2] === "E") {
        newGrid.getCell(iActive, jActive).type = CellType.EmptyUnexplored;
        newGrid.getCell(iOver, jOver).type = CellType.PointB;
      }

      return newGrid;
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        {renderGrid(gridModel)}
      </div>
    </DndContext>
  );
}

export default GridDragNdrop;
