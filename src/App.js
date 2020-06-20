import React from "react";
import "./App.css";
import ModeSelection from "./components/ModeSelection";
// import Selection from "./components/Selection";

function App() {
  return (
    <div className="App">
      <header className="">
        <h2>Transport For London Line Information</h2>
      </header>
      <ModeSelection />
    </div>
  );
}

export default App;
