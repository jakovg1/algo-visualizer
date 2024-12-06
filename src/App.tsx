import { useState } from "react";
import "./App.scss";
import Grid from "./components/Grid";
import { Collapse, Select, Slider, Switch } from "@mantine/core";
import { GetArrayOfInts, randomizeGridValues } from "./components/GridUtils";
import {
  defaultDimension,
  maxDimension,
  minDimension,
} from "./components/Grid.constants";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //grid
  const [dimension, setDimension] = useState(defaultDimension);
  const [grid, setGrid] = useState(randomizeGridValues(dimension));

  //Grid dimension slider
  const sliderMarks = [
    ...GetArrayOfInts(minDimension, maxDimension).map((num) => {
      return { value: num, label: num };
    }),
  ];

  return (
    <>
      <nav className={"sidebar " + (sidebarOpen ? "sidebar-open" : "")}>
        <div className="flex">
          <div className="logo">P f</div>
        </div>

        <div
          className="arrow-icon-container"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <i className="fa-solid fa-angles-left m-4 c-custom-blue"></i>
          ) : (
            <i className="fa-solid fa-angles-right m-4 c-custom-blue"></i>
          )}
        </div>

        <Collapse in={sidebarOpen} transitionDuration={400}>
          <div className="sidebar-content ">
            <h2 className="mb-4">Settings</h2>
            <div className="mb-4">
              <span>Dimension</span>
              <Slider
                color="gray"
                className="w-100"
                marks={sliderMarks}
                min={minDimension}
                max={maxDimension}
                value={dimension}
                onChange={(dimensionValue) =>
                  setDimension((oldDimensionValue) => {
                    if (oldDimensionValue === dimensionValue)
                      return dimensionValue;
                    setGrid(() => {
                      const newGrid = randomizeGridValues(dimensionValue);
                      return newGrid;
                    });
                    return dimensionValue;
                  })
                }
              ></Slider>
            </div>

            <div className="mt-4">
              <span>Pathfinding algorithm</span>
              <Select data={["BFS", "DFS", "A*"]} defaultValue={"BFS"}></Select>
            </div>
            <div className="mt-4 ">
              <span>Use enhanced coloring</span>
              <Switch></Switch>
            </div>
            <div className="mt-4">
              <span>Whatever goes here</span>
            </div>
            <div className="mt-4 ">
              <span>Dark theme</span>
              <Switch></Switch>
            </div>
          </div>
        </Collapse>
      </nav>
      <div className="root-content-container">
        <div className="title">
          <p className="display-1">
            <span className="p-10">Pathfinder</span>
          </p>
          <p className="h2 c-custom-green">Visualize pathfinding algorithms</p>
        </div>
        <div className="main-content">
          <Grid grid={grid} setGrid={setGrid} dimension={dimension} />
        </div>
      </div>
    </>
  );
}

export default App;
