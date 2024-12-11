import { Cell, CellType } from "../components/Grid.constants";

type CellLocation = {
  i: number;
  j: number;
};

type CellLocationNode = {
  parent: CellLocationNode | null;
  cellLocation: CellLocation;
};

type PathfindingAlgorithm = (grid: Cell[][], setGrid: any) => CellLocation[];

export const BFS: PathfindingAlgorithm = (grid: Cell[][], setGrid) => {
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
      paintCurrentNode(setGrid, currentNode, noOfExploredNodes);
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
      break;
    }
  }

  const path: CellLocation[] = [];
  let cnt = 0;
  while (finalNode !== null) {
    const { cellLocation, parent } = finalNode;

    path.push(finalNode.cellLocation);
    if (cnt !== 0 && parent !== null) {
      paintPathNode(setGrid, finalNode, noOfExploredNodes, cnt);
    }
    cnt++;

    finalNode = parent;
  }
  //   console.log("no of explored nodes:", noOfExploredNodes);
  return path.reverse() || [];
};

function paintCurrentNode(
  setGrid: any,
  node: CellLocationNode,
  noOfExploredNodes: number
): void {
  setTimeout(
    () =>
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        const { i, j } = node.cellLocation;
        if (!newGrid[i][j].backgroundColor) {
          newGrid[i][j].animation = true;
        }
        // newGrid[i][j].backgroundColor = { red: 50, green: 50, blue: 150 };

        return newGrid;
      }),
    noOfExploredNodes * 50
  );
}

function paintPathNode(
  setGrid: any,
  node: CellLocationNode,
  noOfExploredNodes: number,
  iter: number
): void {
  setTimeout(
    () =>
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        const { i, j } = node.cellLocation;
        newGrid[i][j].animation = false;
        newGrid[i][j].backgroundColor = { red: 0, green: 150, blue: 0 };
        return newGrid;
      }),
    noOfExploredNodes * 50 + 100 + iter * 10
  );
}
