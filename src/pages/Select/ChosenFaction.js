/*
Chosen Faction Page will display
    - Info on the Faction chosen by user including
        - name
        - about
        - whether group is still together or not
        - all current memebers
        - all former members
        - Main company faction is/was based in
    - YouTube Frame will be poresent on the bottom left corner in where a video about chosen Faction can be played and viewed by user
*/
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenFaction() {
  const location = useLocation();
  const id = location.state.id;
  return <h1>ChosenFaction</h1>;
}
