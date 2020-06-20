import React, { useState, useEffect } from "react";
import LineSelection from "./LineSelection";

function ModeSelection() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Meta/Modes`)
      .then((res) => res.json())
      .then((data) => setModes(data));
  }, []);

  const handleSelectedMode = (e) => {
    // setSelectedLine(null);
    // setRoute(null);
    setSelectedMode(modes.find((mode) => mode.modeName === e.target.value));
  };

  return (
    <>
      <div>
        <select onChange={handleSelectedMode}>
          <option value={""}>Choose a Mode of Transport...</option>
          {modes.map((mode) => (
            <option key={mode.modeName}>{mode.modeName}</option>
          ))}
        </select>
        <p>
          <b>Selected mode: </b> {selectedMode && selectedMode.modeName}{" "}
        </p>
      </div>{" "}
      {selectedMode && <LineSelection selectedMode={selectedMode} />}
    </>
  );
}

export default ModeSelection;
