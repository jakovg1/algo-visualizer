import { Cell, CellType } from "../components/Grid.constants";

type CellLocation = {
  i: number;
  j: number;
};

type CellLocationNode = {
  parent: CellLocationNode | null;
  cellLocation: CellLocation;
};

type PathfindingAlgorithm = (
  grid: Cell[][],
  setGrid: any,
  finishedVisualizationCallback: () => void,
  persistVisualizedAlgorithmDelay: number | null,
  executionSpeedFactor: number
) => void;

const animationManager = {
  animationTimeouts: [0],
  addAnimation(animationId: number) {
    this.animationTimeouts.push(animationId);
  },
  clearAllAnimations() {
    this.animationTimeouts.forEach((id) => clearTimeout(id));
    // console.log("CLEARED ANIMATION? ", this.animationTimeouts);
    this.animationTimeouts = [];
  },
};

export const stopAlgorithmAnimations = () =>
  animationManager.clearAllAnimations();

export const BFS: PathfindingAlgorithm = (
  grid: Cell[][],
  setGrid,
  finishedVisualizationCallback: () => void,
  persistVisualizedAlgorithmDelay: number | null,
  executionSpeedFactor
) => {
  animationManager.animationTimeouts = [];

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

      const timeoutId = paintCurrentNode(
        setGrid,
        currentNode,
        noOfExploredNodes,
        executionSpeedFactor
      );
      animationManager.addAnimation(timeoutId);
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
    const { cellLocation, parent } = finalNode;

    path.push(finalNode.cellLocation);
    const animationTimeoutId = paintPathNode(
      setGrid,
      finalNode,
      noOfExploredNodes,
      noOfPathNodes,
      executionSpeedFactor
    );
    animationManager.addAnimation(animationTimeoutId);
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
    const persistVisualizedAlgorithmId = setTimeout(() => {
      finishedVisualizationCallback();
    }, totalDelay);

    animationManager.addAnimation(persistVisualizedAlgorithmId);
  }

  //   console.log("ALGORITHM COMPLETE!");
};

function paintCurrentNode(
  setGrid: any,
  nodeToBeAnimated: CellLocationNode,
  noOfPreviouslyExploredNodes: number,
  executionSpeedFactor: number = 50
): number {
  const timeoutId = setTimeout(
    () =>
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        const { i, j } = nodeToBeAnimated.cellLocation;
        if (!newGrid[i][j].backgroundColor) {
          newGrid[i][j].animation = true;
        }
        // newGrid[i][j].backgroundColor = { red: 50, green: 50, blue: 150 };
        return newGrid;
      }),
    noOfPreviouslyExploredNodes * executionSpeedFactor
  );
  return timeoutId;
}

function paintPathNode(
  setGrid: any,
  pathNodeToBeAnimated: CellLocationNode,
  noOfExploredNodes: number,
  pathIndex: number,
  executionSpeedFactor: number = 50
): number {
  const timeoutId = setTimeout(
    () =>
      setGrid((prevGrid: Cell[][]) => {
        const newGrid = [...prevGrid];
        const { i, j } = pathNodeToBeAnimated.cellLocation;
        newGrid[i][j].animation = false;
        newGrid[i][j].backgroundColor = { red: 0, green: 216, blue: 126 };
        return newGrid;
      }),
    noOfExploredNodes * executionSpeedFactor +
      100 +
      pathIndex * executionSpeedFactor
  );
  return timeoutId;
}
