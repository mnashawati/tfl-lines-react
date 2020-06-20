import React, { useState, useEffect } from "react";

function Mode() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Meta/Modes`)
      .then((res) => res.json())
      .then((data) => setModes(data));
  }, []);

  useEffect(() => {
    selectedMode &&
      fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode.modeName}`)
        .then((res) => res.json())
        .then((data) => setLines(data))
        .catch((error) => alert("Sorry Something Went Wrong!"));
  }, [selectedMode]);

  useEffect(() => {
    selectedLine &&
      fetch(`https://api.tfl.gov.uk/Line/${selectedLine.id}/Route`)
        .then((res) => res.json())
        .then((data) => setRoute(data))
        .catch((error) => alert("Sorry Something Went Wrong!"));
  }, [selectedLine]);

  const handleSelectedMode = (e) => {
    setSelectedLine(null);
    setRoute(null);
    setSelectedMode(modes.find((mode) => mode.modeName === e.target.value));
  };

  const handleSelectedLine = (e) => {
    setSelectedLine(lines.find((line) => line.name === e.target.value));
  };

  return (
    <>
      <div className="mode-selection-menu">
        <select onChange={handleSelectedMode}>
          <option value={""}>Choose a Mode of Transport...</option>
          {modes.map((mode) => (
            <option key={mode.modeName}>{mode.modeName}</option>
          ))}
        </select>
        <p>
          <b>Selected mode: </b> {selectedMode && selectedMode.modeName}{" "}
        </p>
      </div>

      {lines.length > 0 ? (
        <div className="line-selection-menu">
          <select onChange={handleSelectedLine}>
            <option value={""}>Choose a Line...</option>
            {lines.map((line) => (
              <option key={line.id}>{line.name}</option>
            ))}
          </select>
          <p>
            <b>Selected line: </b> {selectedLine && selectedLine.name}{" "}
          </p>
        </div>
      ) : null}

      {route && lines.length > 0 ? (
        <div className="route-info">
          <span>
            <p>
              START OF LINE: <b>{route.routeSections[0].originationName}</b>
            </p>
          </span>
          <span>
            <b>&#8594;</b>
          </span>
          <span>
            <p>
              END OF LINE: <b>{route.routeSections[0].destinationName}</b>
            </p>
          </span>
        </div>
      ) : null}
    </>
  );
}

export default Mode;
