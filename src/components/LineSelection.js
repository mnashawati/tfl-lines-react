import React, { useState, useEffect } from "react";
import Route from "./Route";

function LineSelection({ selectedMode }) {
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);

  useEffect(() => {
    selectedMode &&
      fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode.modeName}`)
        .then((res) => res.json())
        .then((data) => {
          setLines(data);
          setSelectedLine(null);
        })
        .catch((error) => alert("Sorry Something Went Wrong!"));
  }, [selectedMode]);

  const handleSelectedLine = (e) => {
    if (lines.length > 0) {
      setSelectedLine(lines.find((line) => line.name === e.target.value));
    }
  };

  return (
    <>
      {lines.length > 0 ? (
        <>
          <div className="line-selection-menu">
            <select
              className="selection-dropdown-menu"
              onChange={handleSelectedLine}
            >
              <option value={""}>Choose a Line...</option>
              {lines.map((line) => (
                <option key={line.id}>{line.name}</option>
              ))}
            </select>
            <p>
              <b>Selected line: </b> {selectedLine && selectedLine.name}{" "}
            </p>
          </div>{" "}
          {selectedLine && lines !== [] ? (
            <Route lines={lines} selectedLine={selectedLine} />
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default LineSelection;
