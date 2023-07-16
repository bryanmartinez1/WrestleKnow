import React from "react";
import { useParams, useLocation } from "react-router-dom";

const WrestlerSelect = () => {
  const { wrestlerId } = useParams(); // Accessing the route parameter
  const location = useLocation(); // Accessing the location object
  const queryParams = new URLSearchParams(location.search);
  const wrestlerName = queryParams.get("wrestlerName"); // Accessing the query parameter

  return (
    <div>
      Hello, {wrestlerId} - {wrestlerName}
    </div>
  );
};

export default WrestlerSelect;
