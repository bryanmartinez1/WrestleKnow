import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Parse from "parse/dist/parse.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import FactionDisplay from "./Displays/FactionDisplay";

export default function Faction() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [query, setQuery] = useState();
  const [show, setShow] = useState(false);

  // When User hits enter in searchbar,search hook is updated
  // and query is also updated
  async function newSearch(event) {
    if (event.key === "Enter") {
      console.log(
        "User Searched: " + document.getElementById("searchInput").value
      );
      setSearch(document.getElementById("searchInput").value.toLowerCase());
      closeDrop();
    }
  }

  useEffect(() => {
    console.log("Searched " + search);
    console.log("Sort " + sort);
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
    let wrestlerQuery = new Parse.Query("Faction");
    try {
      wrestlerQuery.contains("name", searchVal);

      //Sorts Query
      if (sortVal === "A - Z") {
        wrestlerQuery.addAscending("name");
      } else if (sortVal === "Z - A") {
        wrestlerQuery.addDescending("name");
      }
      let wrestlerResults = await wrestlerQuery.find();
      console.log(wrestlerResults);
      setQuery(wrestlerResults);
      setShow(true);
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  function showResults() {
    return query.map((faction) => {
      let isActive;
      if (faction.get("status") === true) {
        isActive = "Active";
      } else {
        isActive = "Inactive";
      }
      return (
        <div>
          <FactionDisplay
            showing={0}
            link={"/faction/chosenfaction"}
            name={faction.get("name")}
            infoSTATUS={isActive}
            infoB={JSON.stringify(faction.get("company"))}
            infoFROM={faction.get("from")}
            imgSrc={faction.get("image")}
            innerQuery={"Company"}
            objectId={faction.id}
          ></FactionDisplay>
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
            </div>
          </div>
        </div>
      </div>
      {show && <div className="wrestlerHolder">{showResults()}</div>}
    </div>
  );
}
