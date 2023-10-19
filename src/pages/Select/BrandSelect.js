import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const BrandSelect = () => {
  const { brandId } = useParams(); // Accessing the route parameter

  return <>Hello, {brandId}</>;
};

export default BrandSelect;
