import React, { Key, useState } from "react";
import { MakeSquareMatrix } from "./GridUtils";
import { CellType, GridModel } from "./Grid.constants";
import { DndContext } from "@dnd-kit/core";
import "./Grid.scss";
import GridDroppableItem from "./GridDroppableItem";
import GridDraggableItem from "./GridDraggableItem";

function GridDragNdrop() {
  const [gridModel, setGridModel] = useState(new GridModel(5));

  function renderGrid(gridModel: GridModel) {
    return gridModel.cells.map((row, i) =>
      row.map((square, j) => {
        const isStart = square.type === CellType.PointA;
        const isEnd = square.type === CellType.PointB;

        const id = gridModel.id;
        const key: Key = `${i}${j}${id}`;
        return (
          <GridDroppableItem
            key={key}
            id={id}
            isStart={isStart}
            isEnd={isEnd}
            cell={square}
          >
            {isStart ? (
              <GridDraggableItem id={key} label="START"></GridDraggableItem>
            ) : (
              ""
            )}
            {isEnd ? (
              <GridDraggableItem id={key} label="END"></GridDraggableItem>
            ) : (
              ""
            )}
          </GridDroppableItem>
        );
      })
    );
  }

  function handleDragEnd(event) {
    console.log(event);
    // if (event.over && event.over.id === "droppable") {
    //   setIsDropped(true);
    // }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${5}, 1fr)`,
          gridTemplateRows: `repeat(${5}, 1fr)`,
        }}
      >
        {renderGrid(gridModel)}
      </div>
    </DndContext>
  );
}

export default GridDragNdrop;
