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
import "./wrestler.css";
import Parse from "parse/dist/parse.min.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function Wrestler() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Default");

  // When User hits enter in searchbar,search hook is updated
  // and query is also updated
  const newSearch = (event) => {
    if (event.key === "Enter") {
      console.log(
        "User Searched: " + document.getElementById("searchInput").value
      );
      setSearch(document.getElementById("searchInput").value);
      startQuery();
    }
  };

  // When User changes sort dropdown
  // and query will be updated
  function changeSort(value) {
    if (value === 0) setSort("Default");
    if (value === 1) setSort("A-Z");
    if (value === 2) setSort("Z-A");
    if (value === 3) setSort("Age (Rising)");
    if (value === 4) setSort("Age (Falling)");
    startQuery();
  }

  // Dropdown Functions
  // Proper Implemnation to be Added
  // Functions to Open and Close Dropdown
  var dropOpened = false;
  //Function to Open Dropdown
  function openDrop() {
    document.getElementById("wrestlerdrop").style.display = "block";
    dropOpened = true;
  }
  //Function to Close Dropdown
  function closeDrop() {
    document.getElementById("wrestlerdrop").style.display = "none";
    dropOpened = false;
  }
  //puts the two together
  function dropOpenClose() {
    if (dropOpened === false) {
      openDrop();
    } else {
      closeDrop();
    }
  }

  // Function for when Filters Option is added
  function updateFilters() {
    // To be Added
    startQuery();
  }

  // Query is Started
  async function startQuery() {
    console.log("Search: " + search);
    console.log("Sort: " + sort);
    let wrestlerObject = new Parse.object.extend("Wrestler");
    try {
      const wrestlerQuery = new Parse.Query(wrestlerObject);
      const wrestlerResults = await wrestlerQuery.find();
      console.log(wrestlerResults);
      alert("onload function works");
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  let display = (
    <div className="querybody">
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
            onKeyDown={newSearch}
            id="searchInput"
          ></input>
        </div>
        <div className="sort-holder">
          {/* Dropdown will be updated to that similar of the dropdwon if the navbar */}
          <div className="dropdown">
            <button
              className="dropdown-wrestler-sort-button"
              onClick={() => dropOpenClose()}
            >
              {sort}
            </button>
            <div class="content-box" id="wrestlerdrop">
              <div className="option" onClick={() => changeSort(0)}>
                Default
              </div>
              <div className="option" onClick={() => changeSort(1)}>
                A - Z
              </div>
              <div className="option" onClick={() => changeSort(2)}>
                Z - A
              </div>
              <div className="option" onClick={() => changeSort(3)}>
                Age (Rising)
              </div>
              <div className="option" onClick={() => changeSort(4)}>
                Age (Falling)
              </div>
            </div>
          </div>
        </div>
      </div>
      {display}
    </div>
  );
}
