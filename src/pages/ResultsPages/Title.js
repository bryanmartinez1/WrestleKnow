import React, { useEffect, useState } from "react";
import "./styles/wrestler.css";
import Parse from "parse/dist/parse.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import TitleDisplay from "./TitleDisplay";

export default function Title() {
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
      setSearch(document.getElementById("searchInput").value);
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
    let titleQuery = new Parse.Query("Title");
    try {
      titleQuery.contains("name", searchVal);

      //Sorts Query
      if (sortVal === "A - Z") {
        titleQuery.addAscending("name");
      } else if (sortVal === "Z - A") {
        titleQuery.addDescending("name");
      } else if (sortVal === "Youngest") {
        titleQuery.addDescending("birth");
      } else if (sortVal === "Oldest") {
        titleQuery.addAscending("birth");
      }
      let titleResults = await titleQuery.find();
      setQuery(titleResults);
      setShow(true);
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  function showResults() {
    return query.map((title) => {
      let isActive;
      if (title.get("active") === true) {
        isActive = "Active";
      } else {
        isActive = "Inactive";
      }
      return (
        <div>
          <TitleDisplay
            showing={0}
            link={"/title/chosentitle"}
            name={title.get("name")}
            infoA={isActive}
            infoB={JSON.stringify(title.get("company"))}
            infoDATE={title.get("introduced")}
            imgSrc={title.get("image")}
            innerQuery={"Company"}
            objectId={title.id}
          ></TitleDisplay>
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
