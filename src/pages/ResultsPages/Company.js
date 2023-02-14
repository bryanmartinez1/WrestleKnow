/*
Wrestler Page will display
    - A catalog of wrestlers for the users to quickly browse through and click on to further view info on the selected wrestler
    - Ablitiy toe search, filter, and soprt through the catalog of wrestlers
        - Filtering will consist of
            - company
            - age
            - country wrestler is from
        - Sorting will consist of
            - Recommended
            - Age (rising)
            - Age (falling)
            - Alphabetical
            - Reverse Alphabetical
*/

import React, { useEffect, useState } from "react";
import "./styles/wrestler.css";
import Parse from "parse/dist/parse.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyDisplay from "./CompanyDisplay";

export default function Company() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [query, setQuery] = useState();
  const [show, setShow] = useState(false);

  // When User hits enter in searchbar,search hook is updated
  // and query is also updated
  async function newSearch(event) {
    if (event.key === "Enter") {
      setSearch(document.getElementById("searchInput").value);
      closeDrop();
    }
  }

  useEffect(() => {
    startQuery(search, sort);
  }, [search, sort]);

  // When User changes sort dropdown
  // and query will be updated
  async function changeSort(value) {
    switch (value) {
      case 0:
        setSort("Recommended");
        break;
      case 1:
        setSort("A - Z");
        break;
      case 2:
        setSort("Z - A");
        break;
      case 3:
        setSort("Youngest");
        break;
      case 4:
        setSort("Oldest");
        break;
    }
    closeDrop();
    startQuery(search, sort);
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

  // Query is Started
  async function startQuery(searchVal, sortVal) {
    let wrestlerQuery = new Parse.Query("Company");
    try {
      wrestlerQuery.contains("name", searchVal);

      //Sorts Query
      if (sortVal === "A - Z") {
        wrestlerQuery.addAscending("name");
      } else if (sortVal === "Z - A") {
        wrestlerQuery.addDescending("name");
      } else if (sortVal === "Youngest") {
        wrestlerQuery.addDescending("introduced");
      } else if (sortVal === "Oldest") {
        wrestlerQuery.addAscending("introduced");
      }
      let wrestlerResults = await wrestlerQuery.find();
      setQuery(wrestlerResults);
      setShow(true);
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  function showResults() {
    return query.map((company) => {
      return (
        <div>
          <CompanyDisplay
            link={"/company/chosencompany"}
            name={company.get("name")}
            infoA={company.get("from")}
            infoB={company.get("shortName")}
            infoC={company.get("introduced")}
            imgSrc={company.get("image")}
            objectId={company.id}
          ></CompanyDisplay>
        </div>
      );
    });
  }

  return (
    <div className="wrestler-body">
      <div className="searchbar">
        <div className="bar">
          <img className="searchIcon" src="/search_icon.png"></img>
          <input
            className="searchInput"
            onKeyDown={(key) => newSearch(key)}
            id="searchInput"
          ></input>
        </div>
        <div className="sort-holder">
          {/* Dropdown will be updated to that similar of the dropdwon if the navbar */}
          <div className="dropdown">
            {" "}
            Sort By:
            <button
              className="dropdown-wrestler-sort-button"
              onClick={() => dropOpenClose()}
            >
              {sort}
            </button>
            <div class="content-box" id="wrestlerdrop">
              <div className="option" onClick={() => changeSort(0)}>
                Recommended
              </div>
              <div className="option" onClick={() => changeSort(1)}>
                A - Z
              </div>
              <div className="option" onClick={() => changeSort(2)}>
                Z - A
              </div>
              <div className="option" onClick={() => changeSort(3)}>
                Youngest
              </div>
              <div className="option" onClick={() => changeSort(4)}>
                Oldest
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="wrestlerHolder">{showResults()}</div>}
    </div>
  );
}
