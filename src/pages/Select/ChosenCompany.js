import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenCompany() {
  const location = useLocation();
  const id = location.state.id;
  return <h1>{id}</h1>;
}
