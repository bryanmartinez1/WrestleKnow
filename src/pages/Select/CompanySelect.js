import React from "react";
import { useParams } from "react-router-dom";

const CompanySelect = () => {
  const { companyId } = useParams(); // Accessing the route parameter

  return <div>Hello, {companyId}</div>;
};

export default CompanySelect;
