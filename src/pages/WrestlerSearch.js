import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./search.css";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";

export default function WrestlerSearch() {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  // Sort Dropdown Content
  const sortOptions = [
    "Default",
    "A-Z",
    "Z-A",
    "Age (Rising)",
    "Age (Falling)",
  ];
  const defaultOption = sortOptions[0];
  const [sort, setSort] = useState(defaultOption);
  const [fromSelected, setFromSelected] = useState(null);

  function startQuery() {
    console.log("Sort: " + sort);
    navigate("/wrestler");
  }

  //From Filter Dropdown Selects
  const fromOptions = [
    { name: "USA", id: 1 },
    { name: "Japan", id: 2 },
    { name: "Colombia", id: 3 },
    { name: "Canada", id: 4 },
    { name: "China", id: 5 },
    { name: "England", id: 6 },
    { name: "Scotland", id: 7 },
    { name: "Northern Ireland", id: 8 },
    { name: "France", id: 9 },
    { name: "Germany", id: 10 },
    { name: "Portugal", id: 11 },
    { name: "Mexico", id: 12 },
    { name: "Italy", id: 13 },
    { name: "Greece", id: 14 },
  ];

  const from = ["USA", "Japan", "Colombia"];

  return (
    <div className="body">
      <div className="searchbar">
        <div className="bar">
          <img className="searchIcon"></img>
          <input></input>
        </div>
      </div>

      <div className="sortbar">
        <Dropdown
          options={sortOptions}
          value={defaultOption}
          onChange={({ value }) => setSort(value)}
          menuClassName="myMenuClassName"
        ></Dropdown>
      </div>

      <div className="filterbar">
        <div className="optionsHolder">
          <div className="filterName"></div>
        </div>
      </div>

      <button className="enter" onClick={() => startQuery()}>
        Submit
      </button>
    </div>
  );
}
