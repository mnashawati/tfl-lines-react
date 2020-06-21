import React, { useState, useEffect } from "react";

function Route({ lines, selectedLine }) {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    selectedLine &&
      fetch(`https://api.tfl.gov.uk/Line/${selectedLine.id}/Route`)
        .then((res) => res.json())
        .then((data) => {
          setRoute("");
          setRoute(data);
        })
        .catch((error) => alert("Sorry Something Went Wrong!"));
  }, [selectedLine]);

  return (
    <>
      {route && lines.length > 0 ? (
        <div className="route-info">
          <span className="start-end-line-container">
            <p className="start-end-line-title">START OF LINE</p>
            <p>{route.routeSections[0].originationName}</p>
          </span>
          <span>
            <p className="arrow">&#8594;</p>
          </span>
          <span className="start-end-line-container">
            <p className="start-end-line-title">END OF LINE</p>
            <p>{route.routeSections[0].destinationName}</p>
          </span>
        </div>
      ) : null}
    </>
  );
}

export default Route;
