import React from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";

const CompanySelect = () => {
  const { companyId } = useParams(); // Accessing the route parameter

  return <div>Hello, {companyId}</div>;
};

export default CompanySelect;
