import React from "react";
import { useParams, useLocation } from "react-router-dom";

const TitleSelect = () => {
  const { titleId } = useParams(); // Accessing the route parameter
  const location = useLocation(); // Accessing the location object
  const queryParams = new URLSearchParams(location.search);
  const titleName = queryParams.get("wrestlerName"); // Accessing the query parameter

  return (
    <div>
      Hello, {titleId} - {titleName}
    </div>
  );
};

export default TitleSelect;
