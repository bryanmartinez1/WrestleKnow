import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const FactionSelect = () => {
  const { factionId } = useParams(); // Accessing the route parameter

  return <>Hello, {factionId}</>;
};

export default FactionSelect;
