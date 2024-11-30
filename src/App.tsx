import { useState } from "react";
import "./App.scss";
import Grid from "./components/Grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav className="side-nav">
        <div className="logo">P f</div>
        <div className="icon-container">
          <i className="fa-solid fa-2x fa-gear c-custom-blue m-4"></i>
          {/* <i className="fa-solid fa-2x fa-gear c-custom-blue m-4"></i> */}
        </div>
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
