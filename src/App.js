import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>Lights <span className="App-out">Out</span></h1>
    </header>
    <div className="App-board">
      <Board nrows={6} ncols={6}/>
    </div>

    </div>
  );
}

export default App;
