import React from "react";
import "./App.css";
import ModeSelection from "./components/ModeSelection";
// import Selection from "./components/Selection";

function App() {
  return (
    <div className="App">
      <header className="">
        <p>Transport For London Line Information</p>
      </header>
      <ModeSelection />
    </div>
  );
}

export default App;
