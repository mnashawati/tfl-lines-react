import React, { useState, useEffect } from "react";

function Mode() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState("tube");
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState("");

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Meta/Modes`)
      .then((res) => res.json())
      .then((data) => setModes(data));
  }, []);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode}`)
      .then((res) => res.json())
      .then((data) => setLines(data));
  }, [selectedMode]);

  const handleSelectedMode = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleSelectedLine = (e) => {
    setSelectedLine(e.target.value);
  };

  return (
    <>
      <select onChange={handleSelectedMode}>
        <option value={""}>Choose a Mode of Transport...</option>
        {modes.map((mode) => (
          <option>{mode.modeName}</option>
        ))}
      </select>
      <p>Selected mode: {selectedMode} </p>

      <select onChange={handleSelectedLine}>
        <option value={""}>Choose a Line...</option>
        {lines.map((line) => (
          <option>{line.name}</option>
        ))}
      </select>
      <p>Selected line: {selectedLine} </p>
    </>
  );
}

export default Mode;
