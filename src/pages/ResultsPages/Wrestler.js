/*
Wrestler Page will display
    - A catalog of wrestlers for the users to quickly browse through and click on to further view info on the selected wrestler
    - Ablitiy toe search, filter, and soprt through the catalog of wrestlers
        - Filtering will consist of
            - company
            - age
            - country wrestler is from
        - Sorting will consist of
            - Default
            - Age (rising)
            - Age (falling)
            - Alphabetical
            - Reverse Alphabetical
*/

import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./wrestler.css";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";

export default function Wrestler() {
  // Sort Dropdown Content
  const sortOptions = [
    "Default",
    "A-Z",
    "Z-A",
    "Age (Rising)",
    "Age (Falling)",
  ];
  const defaultOption = sortOptions[0];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultOption);
  // When User hits enter in searchbar,search hook is updated
  // and query is also updated
  function changeSearch(value) {
    console.log(value);
    setSearch(value);
    startQuery();
  }
  // When User changes sort dropdown
  // and query will be updated
  function changeSort(value) {
    setSort(value);
    startQuery();
  }

  // Query is Started
  function startQuery() {
    console.log("Search: " + search);
    console.log("Sort: " + sort);
  }

  let display = (
    <div>
      <div>{search}</div>
      <div>{sort}</div>
    </div>
  );

  return (
    <div className="body">
      <div className="searchbar">
        <div className="bar">
          <img className="searchIcon" src="/search_icon.png"></img>
          <input
            className="searchInput"
            onChange={({ search }) => changeSearch(search)}
          ></input>
        </div>
        <Dropdown
          options={sortOptions}
          value={defaultOption}
          onChange={({ value }) => changeSort(value)}
          menuClassName="myMenuClassName"
        ></Dropdown>
      </div>
      {display}
    </div>
  );
}
