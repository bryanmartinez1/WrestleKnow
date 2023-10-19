import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const PPVSelect = () => {
  const { ppvId } = useParams(); // Accessing the route parameter

  return <>Hello, {ppvId}</>;
};

export default PPVSelect;
