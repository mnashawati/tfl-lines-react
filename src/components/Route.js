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

export default Route;
