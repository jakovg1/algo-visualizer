import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Cell } from "./Grid.constants";
import "./Grid.scss";

function GridDroppableItem(props) {
  const { isStart, isEnd, cell, id, children } = props;
  const { isOver, setNodeRef } = useDroppable({ id });

  const className = `square ${isStart ? "start" : isEnd ? "end" : ""} ${
    cell.type
  }`;

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
}

export default GridDroppableItem;
