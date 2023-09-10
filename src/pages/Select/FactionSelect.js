import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const FactionSelect = () => {
  const { factionId } = useParams(); // Accessing the route parameter

  return <div>Hello, {factionId}</div>;
};

export default FactionSelect;
