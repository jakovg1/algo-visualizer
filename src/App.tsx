import { useState } from "react";
import "./App.scss";
import Grid from "./components/Grid";
import { Collapse, MultiSelect, Select, Slider, Switch } from "@mantine/core";
import { GetArrayOfInts } from "./components/GridUtils";

function App() {
  const [count, setCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const min = 4;
  const max = 16;
  const sliderMarks = [
    ...GetArrayOfInts(min, max).map((num) => {
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

        <Collapse in={sidebarOpen} transitionDuration={100}>
          <div className="sidebar-content ">
            <h2 className="mb-4">Settings</h2>
            <div className="mb-4">
              <span>Dimension</span>
              <Slider
                color="gray"
                className="w-100"
                marks={sliderMarks}
                min={min}
                max={max}
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
          <Grid />
        </div>
      </div>
    </>
  );
}

export default App;
