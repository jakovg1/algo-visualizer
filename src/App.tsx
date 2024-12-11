import { useRef, useState } from "react";
import "./App.scss";
import Grid from "./components/Grid";
import { Collapse, Slider, Tooltip } from "@mantine/core";
import { GetArrayOfInts, randomizeGridValues } from "./components/GridUtils";
import {
  defaultAlgorithmVisualizationDelay,
  defaultDimension,
  maxAlgorithmVisualizationDelay,
  maxDimension,
  minAlgorithmVisualizationDelay,
  minDimension,
  myGithubUrl,
} from "./components/Grid.constants";
import vars from "./variables.module.scss";
import { automaticClosingOfSidebarDelay } from "./App.constants";

function App() {
  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setSidebarFocused] = useState(false);
  const closeSidebarTimeoutRef = useRef<number | null>(null);

  //opening and closing of sidebar
  const handleSidebarMouseOnEnter = () => {
    setSidebarFocused(true);
    if (closeSidebarTimeoutRef.current) {
      // if the sidebar was refocused, do not close it
      clearTimeout(closeSidebarTimeoutRef.current);
    }
    setSidebarOpen(true);
  };
  const handleSidebarMouseOnLeave = () => {
    setSidebarFocused(false);
    // trigger closing of the sidebar after a delay
    closeSidebarTimeoutRef.current = setTimeout(() => {
      setSidebarFocused((focused) => {
        if (!focused) {
          //complete closing of the sidebar if it was not refocused after the delay
          setSidebarOpen(false);
        }
        return focused;
      });
    }, automaticClosingOfSidebarDelay);
  };

  //Grid
  const [dimensionSliderValue, setDimensionSliderValue] =
    useState(defaultDimension);
  const [dimension, setDimension] = useState(defaultDimension);
  const [grid, setGrid] = useState(randomizeGridValues(dimension));

  //Grid dimension slider
  const sliderMarks = [
    ...GetArrayOfInts(minDimension, maxDimension)
      .filter((num) => num % 5 === 0)
      .map((num) => {
        return { value: num, label: num };
      }),
  ];

  // Animation
  const [algorithmVisualizationSpeed, setAlgorithmVisualizationSpeed] =
    useState(defaultAlgorithmVisualizationDelay);
  const visualizationSpeedMarks = [
    { value: minAlgorithmVisualizationDelay, label: "Fast" },
    { value: defaultAlgorithmVisualizationDelay, label: "Medium" },
    { value: maxAlgorithmVisualizationDelay, label: "Slow" },
  ];

  return (
    <>
      <nav
        id="sidebar"
        className={"sidebar " + (sidebarOpen ? "sidebar-open" : "")}
        onMouseEnter={handleSidebarMouseOnEnter}
        onMouseLeave={handleSidebarMouseOnLeave}
      >
        <Tooltip label="Click to find out more">
          <div
            className="logo-container"
            onClick={() => window.open(myGithubUrl, "_blank")}
          >
            <div className="logo">P f</div>
          </div>
        </Tooltip>

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
            <div className="mt-4 mb-4">
              <span>Grid size</span>
              <Slider
                className="dimension-slider"
                color={vars.customBlue}
                marks={sliderMarks}
                min={minDimension}
                max={maxDimension}
                value={dimensionSliderValue}
                onChange={(dimensionSliderValue) =>
                  setDimensionSliderValue(dimensionSliderValue)
                }
                onChangeEnd={(dimensionSliderValue) => {
                  if (dimensionSliderValue !== dimension) {
                    setGrid(() => {
                      const newGrid = randomizeGridValues(dimensionSliderValue);
                      return newGrid;
                    });
                    setDimension(dimensionSliderValue);
                    setDimensionSliderValue(dimensionSliderValue);
                  }
                }}
              ></Slider>
            </div>
            <div className="mt-4">
              <span>Visualization Speed</span>
              <Slider
                className="dimension-slider"
                color={vars.customBlue}
                marks={visualizationSpeedMarks}
                min={minAlgorithmVisualizationDelay}
                max={maxAlgorithmVisualizationDelay}
                value={algorithmVisualizationSpeed}
                onChange={(algorithmVisualizationSpeed) =>
                  setAlgorithmVisualizationSpeed(algorithmVisualizationSpeed)
                }
              ></Slider>
            </div>

            {/* <div className="mt-4">
              <span>Pathfinding algorithm</span>
              <Select
                className="sidebar-select"
                allowDeselect={false}
                data={["BFS", "DFS", "A*"]}
                defaultValue={"BFS"}
                color={vars.customBlue}
              ></Select>
            </div>
            <div className="mt-4 ">
              <span>Use enhanced coloring</span>
              <Switch color={vars.customBlue} className="switch"></Switch>
            </div>
            <div className="mt-4">
              <span>Whatever goes here</span>
            </div>
            <div className="mt-4 ">
              <span>Dark theme</span>
              <Switch color={vars.customBlue} className="switch"></Switch>
            </div>
            <div className="mt-4 ">
              <span>Auto reset grid</span>
              <Switch color={vars.customBlue} className="switch"></Switch>
              <Input color={vars.customBlue}></Input>
            </div> */}
          </div>
        </Collapse>
      </nav>
      <div
        id="main-content"
        className="root-content-container"
        onClick={() => setSidebarOpen(false)}
      >
        <div className="title">
          <p className="display-1">
            <span className="p-10">Pathfinder</span>
          </p>
          <h2 className="subtitle c-custom-green">
            Visualize pathfinding algorithms
          </h2>
        </div>
        <div className="main-content">
          <Grid
            grid={grid}
            setGrid={setGrid}
            dimension={dimension}
            algorithmVisualizationSpeed={algorithmVisualizationSpeed}
          />
        </div>
      </div>
    </>
  );
}

export default App;
