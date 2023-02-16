/*
Chosen Brand Page will display
    - Info on the Brand chosen by user including
        - name
        - age
        - birhtdate
        - height
        - about
        - also known as
        - social media links
        - accomplishments
        - notable moves
        - description of title reigns
    - YouTube Frame will be poresent on the bottom left corner in where a video about chosen Brand can be played and viewed by user
*/
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenBrand() {
  const location = useLocation();
  const id = location.state.id;
  return <h1>Brand</h1>;
}
