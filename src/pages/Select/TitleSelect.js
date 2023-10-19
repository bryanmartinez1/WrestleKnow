import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const TitleSelect = () => {
  const { titleId } = useParams(); // Accessing the route parameter

  return <>Hello, {titleId}</>;
};

export default TitleSelect;
