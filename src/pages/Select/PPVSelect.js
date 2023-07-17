import React from "react";
import { useParams } from "react-router-dom";

const PPVSelect = () => {
  const { ppvId } = useParams(); // Accessing the route parameter

  return <div>Hello, {ppvId}</div>;
};

export default PPVSelect;
