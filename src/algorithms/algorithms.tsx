import { Dispatch, SetStateAction } from "react";
import { CellType, GridModel } from "../components/Grid.constants";
import { Subject, takeUntil, timer } from "rxjs";

type CellLocation = {
  i: number;
  j: number;
};

type CellLocationNode = {
  parent: CellLocationNode | null;
  cellLocation: CellLocation;
};

type PathfindingAlgorithm = (
  gridModel: GridModel,
  setGridModel: Dispatch<SetStateAction<GridModel>>,
  finishedVisualizationCallback: () => void,
  persistVisualizedAlgorithmDelay: number | null,
  executionSpeedFactor: number
) => void;

const stopAnimation = new Subject<void>();
export const stopAlgorithmAnimations = () => {
  stopAnimation.next();
};

export const BFS: PathfindingAlgorithm = (
  gridModel: GridModel,
  setGridModel,
  finishedVisualizationCallback: () => void,
  persistVisualizedAlgorithmDelay: number | null,
  executionSpeedFactor
) => {
  const grid = gridModel.cells;
  //find starting point:
  let [pointArow, pointAcol] = [-1, -1];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j].type === CellType.PointA) {
        pointArow = i;
        pointAcol = j;

        // break from both loops
        i = grid.length;
        break;
      }
    }
  }
  //   console.log("POINT A: ", pointArow, pointAcol);
  let noOfExploredNodes = 0;

  const pointA: CellLocation = { i: pointArow, j: pointAcol };
  let currentNode: CellLocationNode = {
    parent: null,
    cellLocation: pointA,
  };
  let finalNode: CellLocationNode | null = null;
  let listIndex = 0;
  const listOfNodesToBeExplored = [currentNode];

  while (true) {
    // run BFS iteration

    currentNode = listOfNodesToBeExplored[listIndex];
    listOfNodesToBeExplored[listIndex] = {} as CellLocationNode; // to reduce memory

    const { i, j } = currentNode.cellLocation;
    if (grid[i][j].type === CellType.EmptyExplored) {
      listIndex++;
      continue;
    }
    if (grid[i][j].type === CellType.PointB) {
      finalNode = currentNode;
      break;
    }

    //set node to explored
    if (grid[i][j].type === CellType.EmptyUnexplored) {
      grid[i][j].type = CellType.EmptyExplored;
      //   console.log(
      //     `${listIndex}: EXPLORED NODE: `,
      //     i,
      //     j,
      //     grid[i][j].type === CellType.EmptyExplored
      //   );

      paintCurrentNode(
        setGridModel,
        currentNode,
        noOfExploredNodes,
        executionSpeedFactor
      );
      noOfExploredNodes++;
    }

    // explore neighbors
    //top: i - 1, j
    if (
      i - 1 >= 0 &&
      (grid[i - 1][j].type === CellType.EmptyUnexplored ||
        grid[i - 1][j].type === CellType.PointB)
    ) {
      //
      listOfNodesToBeExplored.push({
        parent: currentNode,
        cellLocation: { i: i - 1, j },
      });
    }
    //right: i, j + 1
    if (
      j + 1 < grid.length &&
      (grid[i][j + 1].type === CellType.EmptyUnexplored ||
        grid[i][j + 1].type === CellType.PointB)
    ) {
      //
      listOfNodesToBeExplored.push({
        parent: currentNode,
        cellLocation: { i, j: j + 1 },
      });
    }
    //bottom: i + 1, j
    if (
      i + 1 < grid.length &&
      (grid[i + 1][j].type === CellType.EmptyUnexplored ||
        grid[i + 1][j].type === CellType.PointB)
    ) {
      //
      listOfNodesToBeExplored.push({
        parent: currentNode,
        cellLocation: { i: i + 1, j },
      });
    }
    //left: i, j - 1
    if (
      j - 1 >= 0 &&
      (grid[i][j - 1].type === CellType.EmptyUnexplored ||
        grid[i][j - 1].type === CellType.PointB)
    ) {
      //
      listOfNodesToBeExplored.push({
        parent: currentNode,
        cellLocation: { i, j: j - 1 },
      });
    }

    listIndex++;
    if (listIndex >= listOfNodesToBeExplored.length) {
      // all nodes explored and no path found - exit loop
      break;
    }
  }

  const path: CellLocation[] = [];
  let noOfPathNodes = 0;
  while (finalNode !== null) {
    const { parent } = finalNode;

    path.push(finalNode.cellLocation);
    paintPathNode(
      setGridModel,
      finalNode,
      noOfExploredNodes,
      noOfPathNodes,
      executionSpeedFactor
    );
    noOfPathNodes++;

    finalNode = parent;
  }

  //call this if algorithm should keep the visualized algorithm
  // on the screen for 'keepVisualizedAlgorithmDelay' ms
  if (persistVisualizedAlgorithmDelay) {
    const delayOfAlgorithmVisualization =
      noOfExploredNodes * executionSpeedFactor +
      noOfPathNodes * executionSpeedFactor;
    const totalDelay =
      delayOfAlgorithmVisualization + persistVisualizedAlgorithmDelay;

    timer(totalDelay)
      .pipe(takeUntil(stopAnimation))
      .subscribe(() => finishedVisualizationCallback());
  } else {
    finishedVisualizationCallback();
  }
};

function paintCurrentNode(
  setGridModel: Dispatch<SetStateAction<GridModel>>,
  nodeToBeAnimated: CellLocationNode,
  noOfPreviouslyExploredNodes: number,
  executionSpeedFactor: number = 50
): void {
  const delay = noOfPreviouslyExploredNodes * executionSpeedFactor;
  timer(delay)
    .pipe(takeUntil(stopAnimation))
    .subscribe(() =>
      setGridModel((grid: GridModel) => {
        const newGrid: GridModel = grid.copyGrid();
        const { i, j } = nodeToBeAnimated.cellLocation;
        if (newGrid.getCell(i, j).backgroundColor === null) {
          newGrid.getCell(i, j).animation = true;
        }
        // newGrid[i][j].backgroundColor = { red: 50, green: 50, blue: 150 };
        return newGrid;
      })
    );
}

function paintPathNode(
  setGridModel: Dispatch<SetStateAction<GridModel>>,
  pathNodeToBeAnimated: CellLocationNode,
  noOfExploredNodes: number,
  pathIndex: number,
  executionSpeedFactor: number = 50
): void {
  const delay =
    noOfExploredNodes * executionSpeedFactor + pathIndex * executionSpeedFactor;

  timer(delay)
    .pipe(takeUntil(stopAnimation))
    .subscribe(() =>
      setGridModel((grid: GridModel) => {
        const newGrid: GridModel = grid.copyGrid();
        const { i, j } = pathNodeToBeAnimated.cellLocation;
        newGrid.getCell(i, j).animation = false;
        newGrid.getCell(i, j).backgroundColor = {
          red: 0,
          green: 216,
          blue: 126,
        };
        return newGrid;
      })
    );
}
