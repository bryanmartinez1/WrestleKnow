import React from "react";
import { useParams, useLocation } from "react-router-dom";

const TitleSelect = () => {
  const { titleId } = useParams(); // Accessing the route parameter

  return <div>Hello, {titleId}</div>;
};

export default TitleSelect;
