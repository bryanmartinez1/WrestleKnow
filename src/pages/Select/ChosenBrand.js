import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenBrand() {
  const location = useLocation();
  const id = location.state.id;

  return <h1>Brand</h1>;
}
